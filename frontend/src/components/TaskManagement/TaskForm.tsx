import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// ✅ Define a TypeScript interface for User
interface User {
  _id: string;
  name: string;
  email: string;
}

// ✅ Define props for TaskForm
interface TaskFormProps {
  onSubmit: (data: TaskFormValues) => void;
  onCancel: () => void;
  initialData?: TaskFormValues;
  users: User[];
}

// ✅ Define form schema using Zod
const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  receiverId: z.string().min(1, { message: "Please select a receiver" }),
});

// ✅ Define TypeScript type from Zod schema
type TaskFormValues = z.infer<typeof formSchema>;

const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  users,
}) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      receiverId: "",
    },
  });

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md border">
      <Form>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* ✅ Title Field */}
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    {...field} // ✅ Spread field to bind input correctly
                    placeholder="Task title"
                    className="w-full border-gray-300 rounded-lg shadow-sm"
                  />
                </FormControl>
                <FormMessage>{errors.title?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* ✅ Description Field */}
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field} // ✅ Correctly bind textarea
                    placeholder="Describe the task in detail"
                    className="w-full border-gray-300 rounded-lg shadow-sm min-h-[100px]"
                  />
                </FormControl>
                <FormMessage>{errors.description?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* ✅ Assign To (Receiver ID) Field */}
          <FormField
            control={control}
            name="receiverId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Assign To
                </FormLabel>
                <Select
                  value={field.value} // ✅ Ensure value is properly set
                  onValueChange={(value) => field.onChange(String(value))} // ✅ Ensure a string is passed
                >
                  <FormControl>
                    <SelectTrigger className="w-full border-gray-300 rounded-lg shadow-sm">
                      <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users?.map((user) => (
                      <SelectItem key={user._id} value={user._id}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage>{errors.receiverId?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* ✅ Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="border-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TaskForm;
