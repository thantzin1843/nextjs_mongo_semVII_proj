'use server'
import { signIn, signOut } from "@/auth";

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export const doCredentialLogin = async(formData) =>{
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (err) {
    throw err;
  }
}

// tapascript
