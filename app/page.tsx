"use client"

import { useState, useEffect } from "react"
import AddExpenseForm from "@/components/add-expense-form"
import AddIncomeForm from "@/components/add-income-form"
import TransactionList from "@/components/transaction-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface Transaction {
  id: string
  amount: number
  category: string
  date: string
  description: string
  type: "income" | "expense"
}

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    // Load transactions from localStorage on mount
    const storedTransactions = localStorage.getItem("transactions")
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions))
    }
  }, [])

  useEffect(() => {
    // Save transactions to localStorage whenever they change
    localStorage.setItem("transactions", JSON.stringify(transactions))
  }, [transactions])

  const addExpense = (newExpense: Omit<Transaction, "id" | "type">) => {
    setTransactions((prevTransactions) => [
      { ...newExpense, id: crypto.randomUUID(), type: "expense" },
      ...prevTransactions, // Add new expense to the top
    ])
  }

  const addIncome = (newIncome: Omit<Transaction, "id" | "type">) => {
    setTransactions((prevTransactions) => [
      { ...newIncome, id: crypto.randomUUID(), type: "income" },
      ...prevTransactions, // Add new income to the top
    ])
  }

  const deleteTransaction = (id: string) => {
    setTransactions((prevTransactions) => prevTransactions.filter((transaction) => transaction.id !== id))
  }

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, expense) => sum + expense.amount, 0)

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, income) => sum + income.amount, 0)

  const totalBalance = totalIncome - totalExpenses

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-950 p-4 pb-20">
      {" "}
      {/* Added pb-20 to prevent content from being hidden by the fixed bar */}
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="flex justify-center mt-8 mb-4">
          <Image src="/my-finances-logo.png" alt="My Finances Logo" width={200} height={50} priority />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <Card className="bg-green-100 dark:bg-green-900">
            <CardHeader>
              <CardTitle className="text-green-700 dark:text-green-300">Total Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700 dark:text-green-300">${totalIncome.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card className="bg-blue-100 dark:bg-blue-900">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300">Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">${totalBalance.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card className="bg-red-100 dark:bg-red-900">
            <CardHeader>
              <CardTitle className="text-red-700 dark:text-red-300">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-700 dark:text-red-300">${totalExpenses.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <TransactionList transactions={transactions} onDeleteTransaction={deleteTransaction} />
          </CardContent>
        </Card>
      </div>
      {/* Fixed bottom action bar */}
      <div className="w-xs max-w-full m-auto fixed bottom-0 left-0 right-0 p-4">
        <div className="max-w-full m-auto flex justify-center gap-4 z-10 ">
          <AddIncomeForm onAddIncome={addIncome} />
          <AddExpenseForm onAddExpense={addExpense} />
        </div>
      </div>
      <footer className="w-full text-center text-sm text-muted-foreground py-4 mt-8">
        Made with ❤️ by Iconic Chandu
      </footer>
    </div>
  )
}
