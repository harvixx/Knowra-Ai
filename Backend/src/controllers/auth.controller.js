import User from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";
import jwt from "jsonwebtoken";
import { clearAuthCookies, setAuthCookies } from "../utils/cookie.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import crypto from "crypto";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false,
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            verified: false,
        });

        const emailToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${emailToken}`;

        await sendEmail({
            to: user.email,
            subject: "Verify your email – Knowra AI 🚀",
            html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #4F46E5;">Welcome to Knowra AI, ${user.name}! 🚀</h1>
            <p style="color: #374151; font-size: 16px;">
              Please verify your email address to activate your account.
            </p>
            <a 
              href="${verificationUrl}" 
              style="
                display: inline-block;
                background-color: #4F46E5;
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                text-decoration: none;
                font-size: 16px;
                margin: 20px 0;
              "
            >
              Verify Email
            </a>
            <p style="color: #6B7280; font-size: 14px;">
              This link expires in 1 hour.
            </p>
          </div>
        `})
        return res.status(201).json({
            message: "User registered successfully. Please verify your email.",
            success: true,
        });

    } catch (error) {
        console.error("REGISTER ERROR 👉", error);
        if (error.code === 11000) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false,
            });
        }

        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({
                message: "Token is required",
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({
                message: "Invalid token or user not found",
                success: false,
            });
        }

        if (user.verified) {
            return res.status(200).json({
                message: "Email already verified",
                success: true,
            });
        }

        user.verified = true;
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        const hash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        user.sessions.push({
            refreshTokenHash: hash,
            userAgent: req.headers["user-agent"],
            ip: req.ip,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        await user.save();

        setAuthCookies(res, accessToken, refreshToken);

        return res.status(200).json({
            message: "Email verified & logged in successfully",
            success: true,
        });

    } catch (error) {
        console.error("Verify email error:", error.message);

        return res.status(400).json({
            message: "Invalid or expired token",
            success: false,
        });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false,
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false,
            });
        }

        if (!user.verified) {
            return res.status(403).json({
                message: "Please verify your email first",
                success: false,
            });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        const hash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        user.sessions.push({
            refreshTokenHash: hash,
            userAgent: req.headers["user-agent"],
            ip: req.ip,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        await user.save();

        setAuthCookies(res, accessToken, refreshToken);

        return res.status(200).json({
            message: "Login successful",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
export const getMe = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        verified: user.verified,
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken && req.user) {
      const hash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

      req.user.sessions = req.user.sessions.filter(
        (s) => s.refreshTokenHash !== hash
      );

      await req.user.save();
    }

    clearAuthCookies(res);

    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Unauthorized - No refresh token",
        success: false,
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized - User not found",
        success: false,
      });
    }

    const hash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = user.sessions.find(
      (s) => s.refreshTokenHash === hash
    );

    if (!session) {
      return res.status(401).json({
        message: "Unauthorized - Invalid session",
        success: false,
      });
    }

    user.sessions = user.sessions.filter(
      (s) => s.refreshTokenHash !== hash
    );

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    const newHash = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");

    user.sessions.push({
      refreshTokenHash: newHash,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await user.save();

    setAuthCookies(res, newAccessToken, newRefreshToken);

    return res.status(200).json({
      message: "Token refreshed",
      success: true,
    });

  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized - Invalid or expired refresh token",
      success: false,
    });
  }
};
export const resendEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (user.verified) {
      return res.status(400).json({
        message: "Email already verified",
        success: false,
      });
    }

    const emailToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${emailToken}`;

    await sendEmail({
      to: user.email,
      subject: "Resend: Verify your email – Knowra AI 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #4F46E5;">Verify your email, ${user.name}! 🚀</h1>
          <p style="color: #374151; font-size: 16px;">
            You requested a new verification link. Click below to verify your email.
          </p>
          <a 
            href="${verificationUrl}" 
            style="
              display: inline-block;
              background-color: #4F46E5;
              color: white;
              padding: 12px 24px;
              border-radius: 8px;
              text-decoration: none;
              font-size: 16px;
              margin: 20px 0;
            "
          >
            Verify Email
          </a>
          <p style="color: #6B7280; font-size: 14px;">
            This link expires in 1 hour.
          </p>
        </div>
      `,
    });

    return res.status(200).json({
      message: "Verification email resent successfully",
      success: true,
    });

  } catch (error) {
    console.error("RESEND EMAIL ERROR 👉", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};