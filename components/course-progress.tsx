// import { Progress } from "@/components/ui/progress";
// import { cn } from "@/lib/utils";

// interface CourseProgressProps {
//   value: number;
//   variant?: "default" | "success",
//   size?: "default" | "sm";
// };

// const colorByVariant = {
//   default: "text-sky-700",
//   success: "text-emerald-700",
// }

// const sizeByVariant = {
//   default: "text-sm",
//   sm: "text-xs",
// }

// // export const CourseProgress = ({
// //   value,
// //   variant,
// //   size,
// // }
// export const CourseProgress = ({
//   value,
//   variant = "default",
//   size = "default",
// }
// : CourseProgressProps) => {
//   return (
//     <div>
//       <Progress
//         className="h-2"
//         value={value}
//         variant={variant}
//       />
//       <p className={cn(
//         "font-medium mt-2 text-sky-700",
//         colorByVariant[variant || "default"],
//         sizeByVariant[size || "default"],
//       )}>
//         {Math.round(value)}% Complete
//       </p>
//     </div>
//   )
// }

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
}

const colorByVariant = {
  default: "bg-sky-700",
  success: "bg-emerald-700",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

export const CourseProgress = ({
  value,
  variant = "default",
  size = "default",
}: CourseProgressProps) => {
  return (
    <div>
      <Progress
        className={cn(
          "h-2",
          colorByVariant[variant],
        )}
        value={value}
      />
      <p className={cn(
        "font-medium mt-2",
        sizeByVariant[size],
      )}>
        {Math.round(value)}% Complete
      </p>
    </div>
  );
}