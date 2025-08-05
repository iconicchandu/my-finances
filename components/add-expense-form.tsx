"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer"
import { MinusCircle } from "lucide-react"

interface AddExpenseFormProps {
  onAddExpense: (expense: { amount: number; category: string; date: string; description: string }) => void
}

export default function AddExpenseForm({ onAddExpense }: AddExpenseFormProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || !category || !date) {
      alert("Please fill in all required fields: Amount, Category, and Date.")
      return
    }
    const newExpense = {
      amount: Number.parseFloat(amount),
      category,
      date,
      description,
    }
    onAddExpense(newExpense)
    setAmount("")
    setCategory("")
    setDescription("")
    setDate("")
    setOpen(false)
  }

  const categories = ["Food", "Transport", "Utilities", "Entertainment", "Shopping", "Health", "Education", "Other"]

  const FormContent = (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="amount" className="text-right">
          Amount
        </Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="col-span-3"
          placeholder="e.g., 25.50"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="category" className="text-right">
          Category
        </Label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger id="category" className="col-span-3">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="date" className="text-right">
          Date
        </Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="col-span-3"
          placeholder="e.g., Coffee with friends"
        />
      </div>
      <DialogFooter className="mt-4">
        <Button type="submit" className="w-full">
          Add Expense
        </Button>
      </DialogFooter>
    </form>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className="bg-red-500 hover:bg-red-600">
            <MinusCircle className="h-5 w-5 mr-2" />
            Add Expense
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Add New Expense</DrawerTitle>
            <DrawerDescription>Fill in the details for your new expense.</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">{FormContent}</div>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-500 hover:bg-red-600">
          <MinusCircle className="h-5 w-5 mr-2" />
          Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>Fill in the details for your new expense.</DialogDescription>
        </DialogHeader>
        {FormContent}
      </DialogContent>
    </Dialog>
  )
}
