// "use client"

import { useEffect, useState } from "react";
import { IFactoryInfo } from "@/utils/type";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Fetch data

const formSchema = z.object({
  fuel: z.string({
    required_error: "Please select a fuel.",
  }),
  location: z.string({
    required_error: "Please select an location.",
  }),
});

interface IFuel {
  id: string;
  name: string;
  value: number;
}

interface ILocation {
  id: string;
  name: string;
  value: number;
}

import data from "@/data/config.json";

export function SettingForm() {
  const [fuel, setFuel] = useState<IFuel[]>([]);
  const [location, setLocation] = useState<ILocation[]>([]);
  useEffect(() => {
    setFuel(data.fuel);
    setLocation(data.location);
  });

  // 1. Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="fuel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fuel</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a fuel" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {fuel.map((item) => (
                    <SelectItem key={item.id} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {location.map((item) => (
                    <SelectItem key={item.id} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
