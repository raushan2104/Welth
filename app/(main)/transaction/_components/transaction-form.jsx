'use client';
import useFetch from '@/hooks/use-fetch';
import React from 'react'
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

const AddTransactionForm = ({accounts, categories}) => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: {errors},
        watch,
        getValues,
        reset,
    }=useForm({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            type : "EXPENSE",
            amount: "",
            description:"",
            accountId: accounts.find((ac) => ac.isDefault)?.id,
            date:new Date(),
            isRecurring: false,
        },
    });

    const {
        loading: transactionLoading,
        fn: transactionFn,
        data: transactionResult,
    } = useFetch(createTransaction);

    const type = watch( "type");
    const isRecurring = watch("isRecurring");
    const date = watch("date");
  return (
    <form className='space-y-6'>
    {/* AI receipt scanner */}
    <div className='space-y-2'>
      <label className='text-sm font-medium'>
        Type
        </label>
        <Select 
            onValueChange= {(value)=> setValue("type", value)}
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
    {/* {errors.type && (
        <p className='text-sm text-red-500'>{errors.type.message}</p>
    )} */}
      
    </div>
    </form>
  )
}

export default AddTransactionForm;
