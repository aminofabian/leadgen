"use server"

import { getCurrentUser } from "../../actions/user";

export async function getDataDisplay() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: "User not found"
      };
    }

    // Add your data display logic here
    return {
      success: true,
      data: {
        user,
        // Add more data as needed
      }
    };
  } catch (error) {
    console.error("Error in getDataDisplay:", error);
    return {
      success: false,
      error: "Failed to fetch data display"
    };
  }
}
