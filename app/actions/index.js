'use server'
import { auth, signIn, signOut } from "@/auth";

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
export const getUserId = async () => {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error('User not authenticated');
  }
  return { data: { _id: session.user._id } };
}