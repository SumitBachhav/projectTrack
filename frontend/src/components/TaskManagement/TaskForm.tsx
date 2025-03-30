import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '../ui/button';
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface TaskFormProps {
  onSubmit: (data: { title: string; description: string; receiverId: string }) => void;
  onCancel: () => void;
  initialData?: {
    title: string;
    description: string;
    receiverId: string;
  };
  users: User[];
}

// Define the validation schema
const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  receiverId: z.string().nonempty({ message: 'Please select a receiver' }),
});

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, initialData, users }) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      receiverId: '',
    },
  });

  return (
    <Form>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title Field */}
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input placeholder="Task title" {...register('title')} />
          </FormControl>
          <FormMessage>{errors.title?.message}</FormMessage>
        </FormItem>

        {/* Description Field */}
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea placeholder="Describe the task in detail" className="min-h-[100px]" {...register('description')} />
          </FormControl>
          <FormMessage>{errors.description?.message}</FormMessage>
        </FormItem>

        {/* Assign To (ReceiverId) Field */}
        <FormItem>
          <FormLabel>Assign To</FormLabel>
          <Controller
            name="receiverId"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    {field.value ? (
                      <SelectValue>{users.find(user => user._id === field.value)?.name || 'Unknown User'}</SelectValue>
                    ) : (
                      <span className="text-gray-500">Select a user</span>
                    )}
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user._id} value={user._id}>
                      {user.name} ({user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FormMessage>{errors.receiverId?.message}</FormMessage>
        </FormItem>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default TaskForm;
