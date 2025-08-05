"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface Expense {
  id: string
  amount: number
  category: string
  date: string
  description: string
}

interface ExpenseListProps {
  expenses: Expense[]
  onDeleteExpense: (id: string) => void
}

export default function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No expenses added yet. Click the "+" button to add your first expense!
      </div>
    )
  }

  return (
    <ScrollArea className="h-[calc(100vh-200px)] w-full rounded-md border p-4">
      <div className="grid gap-4">
        {expenses.map((expense) => (
          <Card key={expense.id} className="flex items-center justify-between p-4">
            <div className="grid gap-1">
              <div className="font-semibold text-lg">${expense.amount.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">
                {expense.category} - {new Date(expense.date).toLocaleDateString()}
              </div>
              {expense.description && <div className="text-sm text-muted-foreground italic">{expense.description}</div>}
            </div>
            <Button variant="ghost" size="icon" onClick={() => onDeleteExpense(expense.id)}>
              <Trash2 className="h-4 w-4 text-red-500" />
              <span className="sr-only">Delete expense</span>
            </Button>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}
