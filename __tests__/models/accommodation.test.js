import "../test-setup.js";
import { describe, it, expect } from "vitest";
import User from "../../src/models/User.js";
import Accommodation from "../../src/models/Accommodation";

describe("Accommodation Model", () => {
  it("should create an accommodation", async () => {
    const user = await User.create({
      username: "testuser",
      email: "testuser@example.com",
    });

    const accommodation = await Accommodation.create({
      address: "Huvudgatan 1",
      city: "Stockholm",
      zipCode: "12345",
      country: "Sweden",
      rentalPrice: 1000,
      rooms: 3,
      userId: user._id
    });

    expect(accommodation).toBeDefined();
    expect(accommodation.city).toBe("Stockholm");
    expect(accommodation.userId.toString()).toBe(user._id.toString());
  });

  it("should require address", async () => {
    const user = await User.create({
      username: "testuser",
      email: "testuser@example.com",
    });

    await expect(
      Accommodation.create({
        city: "Stockholm",
        zipCode: "12345",
        country: "Sweden",
        rentalPrice: 1000,
        rooms: 3,
        userId: user._id
      })
    ).rejects.toThrow("Accommodation validation failed");
  });

  it("should require rentalPrice to be positive", async () => {
    const user = await User.create({
      username: "testuser",
      email: "testuser@example.com",
    });

    await expect(
      Accommodation.create({
        address: "Huvudgatan 1",
        city: "Stockholm",
        zipCode: "12345",
        country: "Sweden",
        rentalPrice: -1000,
        rooms: 3,
        userId: user._id
      })
    ).rejects.toThrow("Accommodation validation failed");
  });

    it("should require rooms to be at least 1", async () => {
    const user = await User.create({
      username: "testuser",
      email: "testuser@example.com",
    });

    await expect(
      Accommodation.create({
        address: "Huvudgatan 1",
        city: "Stockholm",
        zipCode: "12345",
        country: "Sweden",
        rentalPrice: 1000,
        rooms: 0,
        userId: user._id
      })
    ).rejects.toThrow("Accommodation validation failed");
  });
});