"use client";

import * as z from "zod";
import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ConversationPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const {
    formState: { isSubmitting: isLoading },
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="GPT ultra pro max 4.0"
        icon={MessageSquare}
        bgColor="bg-violet-500/10"
        iconColor="text-violet-500"
      />
      <div className="px-4 lg:px-8">
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex justify-between md:flex-col  rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="pucho kya puchna h"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="md:w-full col-span-12 lg:col-span-2"
                disabled={isLoading}
              >
                Generate Answer
              </Button>
            </form>
          </Form>
        </div>
        <div className="">Messages content</div>
      </div>
    </div>
  );
};

export default ConversationPage;
