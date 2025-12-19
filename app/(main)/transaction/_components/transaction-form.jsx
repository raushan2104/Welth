'use client';

import React from 'react';
import useFetch from '@/hooks/use-fetch';
import { useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { transactionSchema } from "@/app/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTransaction } from '@/actions/transaction';
import CreateAccountDrawer from '@/components/create-account-drawer';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useEffect } from 'react';

const AddTransactionForm = ({ accounts, categories }) => {
  const router= useRouter()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "EXPENSE",
      amount: "",
      description: "",
      accountId: accounts.find((ac) => ac.isDefault)?.id,
      date: new Date(),
      isRecurring: false,
    },
  });

  const {
    loading: transactionLoading,
    fn: transactionFn,
    data: transactionResult,
  } = useFetch(createTransaction);

  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const date = watch("date");

  const onSubmit = async(data) =>{
    const formData ={
      ...data,
      amount : parseFloat(data.amount),
    };
    await transactionFn(formData);
  };
  useEffect(()=>{
    if(transactionResult?.success && !transactionLoading){
      toast.success("Transaction created successfully");
      reset();
      router.push(`/account/${transactionResult.data.accountId}`);
    }
  }, [transactionResult, transactionLoading]);
  console.log(transactionResult);

  const filteredCategories = categories.filter(
    (category) => category.type === type
  );

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* AI receipt scanner */}
      <div className="space-y-2 ">
        <label className="text-sm font-medium">Type</label>
        <Select
          onValueChange={(value) => setValue("type", value)}
          defaultValue={type}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EXPENSE">Expense</SelectItem>
            <SelectItem value="INCOME">Income</SelectItem>
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="text-sm text-red-500">{errors.type.message}</p>
        )}
      </div>

      {/* Amount + Account fields in same line and centered */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
  {/* Amount field */}
  <div className="space-y-2">
    <label className="text-sm font-medium">Amount</label>
    <input
      type="number"
      step="0.01"
      placeholder="0.00"
      {...register("amount")}
      className="border rounded-md p-2 w-full"
    />
    {errors.amount && (
      <p className="text-sm text-red-500">{errors.amount.message}</p>
    )}
  </div>

  {/* Account field */}
  <div className="space-y-2">
    <label className="text-sm font-medium">Account</label>
    <Select
      onValueChange={(value) => setValue("accountId", value)}
      defaultValue={getValues("accountId")}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select account" />
      </SelectTrigger>
      <SelectContent>
        {accounts.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name} (${parseFloat(account.balance).toFixed(2)})
          </SelectItem>
        ))}
        <CreateAccountDrawer>
          <Button
            variant="ghost"
            className="w-full select-none items-center text-sm outline-none"
          >
            Create Account
          </Button>
        </CreateAccountDrawer>
      </SelectContent>
    </Select>
    {errors.accountId && (
      <p className="text-sm text-red-500">{errors.accountId.message}</p>
    )}
  </div>
</div>
{/* category field */}
<div className="space-y-2 ">
    <label className="text-sm font-medium">Category</label>
    <Select
      onValueChange={(value) => setValue("category", value)}
      defaultValue={getValues("category")}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {filteredCategories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name} 
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {errors.category && (
  <p className="text-sm text-red-500">{errors.category.message}</p>
)}

  </div>
  {/* Date */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full pl-3 text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              {date ? format(date, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => setValue("date", date)}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.date && (
          <p className="text-sm text-red-500">{errors.date.message}</p>
        )}
      </div>
      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Input placeholder="Enter description" {...register("description")} />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Recurring Interval */}
      <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <label
                  htmlFor="isDefault"
                  className="text-base font-medium cursor-pointer"
                >
                  Recurring Transaction
                </label>
                <p className="text-sm text-muted-foreground">
                  Set up a recurring schedule for this transaction
                </p>
              </div>
              <Switch
                checked={isRecurring}
                onCheckedChange={(checked) => setValue("isRecurring", checked)}
              />
            </div>
      {isRecurring && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Recurring Interval</label>
          <Select
            onValueChange={(value) => setValue("recurringInterval", value)}
            defaultValue={getValues("recurringInterval")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DAILY">Daily</SelectItem>
              <SelectItem value="WEEKLY">Weekly</SelectItem>
              <SelectItem value="MONTHLY">Monthly</SelectItem>
              <SelectItem value="YEARLY">Yearly</SelectItem>
            </SelectContent>
          </Select>
          {errors.recurringInterval && (
            <p className="text-sm text-red-500">
              {errors.recurringInterval.message}
            </p>
          )}
        </div>
        
      )}
      <div className='inline-flex gap-21'>
        <Button
          type='button'
          variant="outline"
          className='w-full'
          onClick={()=> router.back()}
        >
          Cancel
        </Button>
        <Button type="submit" className='w-full' disabled={transactionLoading}>
          Create Transaction

        </Button>

      </div>

    </form>
  );
};

export default AddTransactionForm;
