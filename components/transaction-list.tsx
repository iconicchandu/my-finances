"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Trash2, ArrowDownCircle, ArrowUpCircle } from "lucide-react"

interface Transaction {
  id: string
  amount: number
  category: string
  date: string
  description: string
  type: "income" | "expense"
}

interface TransactionListProps {
  transactions: Transaction[]
  onDeleteTransaction: (id: string) => void
}

export default function TransactionList({ transactions, onDeleteTransaction }: TransactionListProps) {
  if (transactions.length === 0) {
    return <div className="text-center text-muted-foreground py-8">Add your first income or expense!</div>
  }

  return (
    <ScrollArea className="h-[calc(100vh-300px)] w-full rounded-md border p-4">
      <div className="grid gap-4">
        {transactions.map((transaction) => (
          <Card key={transaction.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              {transaction.type === "income" ? (
                <ArrowUpCircle className="h-6 w-6 text-green-500" />
              ) : (
                <ArrowDownCircle className="h-6 w-6 text-red-500" />
              )}
              <div className="flex items-center gap-5 justify-start">
                <div
                  className={`font-semibold text-lg ${
                    transaction.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {transaction.category} - {new Date(transaction.date).toLocaleDateString()}
                </div>
                <Button variant="ghost" size="icon" onClick={() => onDeleteTransaction(transaction.id)}>
                  <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                  <span className="sr-only">Delete transaction</span>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}
