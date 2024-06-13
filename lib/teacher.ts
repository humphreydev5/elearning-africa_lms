// Function to check if a user is a teacher based on the userId
export const isTeacher = (userId?: string | null) => {
    return userId === process.env.NEXT_PUBLIC_TEACHER_ID;
}
