import "../test-setup";
import { describe, it, expect } from "vitest";
import User from "../../src/models/User";

describe("User Model", () => {
  it("should create a user", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@test.com",
    });

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
  });

  it("should require a unique email", async () => {
    await User.create({
      username: "testuser1",
      email: "test1@test.com",
    });

    await expect(
      User.create({
        username: "testuser2",
        email: "test1@test.com",
      })
    ).rejects.toThrow("E11000 duplicate key error");
  });

  it("should require a unique username", async () => {
    await User.create({
      username: "testuser1",
      email: "test1@test.com",
    });

    await expect(
      User.create({
        username: "testuser1", // Same username
        email: "test2@test.com",
      })
    ).rejects.toThrow("E11000 duplicate key error");
  });

  it("should validate email format", async () => {
    await expect(
      User.create({
        username: "testuser",
        email: "invalid-email",
      })
    ).rejects.toThrow("Please enter a valid email address");
  });

  it("should validate profileImage URL format", async () => {
    await expect(
      User.create({
        username: "testuser",
        email: "test@test.com",
        profileImage: "invalid-url",
      })
    ).rejects.toThrow("Please enter a valid URL for your image");
  });
});