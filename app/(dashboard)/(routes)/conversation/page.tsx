"use client";

import * as z from "zod";
import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ChatCompletionRequestMessage, { OpenAI } from "openai";
import axios from "axios";

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<any>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting: isLoading },
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: OpenAI.Chat.ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      console.log(newMessages, "nom");

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });
      console.log(response.data, "resp.data");

      setMessages((current: any) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
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
              onSubmit={handleSubmit(onSubmit)}
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
        <div className="">
          <div className="flex-col-reverse gap-y-4">
            {messages.map((message: any) => (
              <div key={message.content}>{message.content}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
