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
import { PlusCircle } from "lucide-react"

interface AddIncomeFormProps {
  onAddIncome: (income: { amount: number; category: string; date: string; description: string }) => void
}

export default function AddIncomeForm({ onAddIncome }: AddIncomeFormProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("Salary") // Default category for income
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
    const newIncome = {
      amount: Number.parseFloat(amount),
      category,
      date,
      description,
    }
    onAddIncome(newIncome)
    setAmount("")
    setCategory("Salary")
    setDescription("")
    setDate("")
    setOpen(false)
  }

  const categories = ["Salary", "Freelance", "Gift", "Investment", "Other"]

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
          placeholder="e.g., 1000.00"
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
          placeholder="e.g., Monthly salary"
        />
      </div>
      <DialogFooter className="mt-4">
        <Button type="submit" className="w-full">
          Add Income
        </Button>
      </DialogFooter>
    </form>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className="bg-green-500 hover:bg-green-600">
            <PlusCircle className="h-6 w-6 mr-2" />
            Add Income
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Add New Income</DrawerTitle>
            <DrawerDescription>Fill in the details for your new income.</DrawerDescription>
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
        <Button className="bg-green-500 hover:bg-green-600">
          <PlusCircle className="h-6 w-6 mr-2" />
          Add Income
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Income</DialogTitle>
          <DialogDescription>Fill in the details for your new income.</DialogDescription>
        </DialogHeader>
        {FormContent}
      </DialogContent>
    </Dialog>
  )
}
