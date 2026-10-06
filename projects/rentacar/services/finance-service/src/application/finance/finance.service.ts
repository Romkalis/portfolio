import { Injectable, NotFoundException } from '@nestjs/common';
import { ExpenseCategory } from '@prisma/finance-client';
import { notDeleted } from '@rentacar/prisma';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { CreateExpenseDto } from '../../presentation/finance/dto/create-expense.dto';
import { CreateIncomeDto } from '../../presentation/finance/dto/create-income.dto';

@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  listIncome(carId?: string, from?: string, to?: string) {
    return this.prisma.income.findMany({
      where: {
        ...notDeleted(),
        carId,
        ...(from && to
          ? { occurredAt: { gte: new Date(from), lte: new Date(to) } }
          : {}),
      },
      orderBy: { occurredAt: 'desc' },
      take: 200,
    });
  }

  listExpenses(carId?: string, from?: string, to?: string) {
    return this.prisma.expense.findMany({
      where: {
        ...notDeleted(),
        carId,
        ...(from && to
          ? { occurredAt: { gte: new Date(from), lte: new Date(to) } }
          : {}),
      },
      orderBy: { occurredAt: 'desc' },
      take: 200,
    });
  }

  createIncome(dto: CreateIncomeDto) {
    return this.prisma.income.create({
      data: { ...dto, occurredAt: new Date(dto.occurredAt) },
    });
  }

  createExpense(dto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: { ...dto, occurredAt: new Date(dto.occurredAt) },
    });
  }

  async summary(from: string, to: string, carId?: string) {
    const start = new Date(from);
    const end = new Date(to);
    const base = { occurredAt: { gte: start, lte: end }, ...notDeleted() };

    const [incomes, expenses] = await Promise.all([
      this.prisma.income.findMany({ where: { ...base, carId } }),
      this.prisma.expense.findMany({ where: { ...base, carId } }),
    ]);

    const totalIncome = incomes.reduce((s, i) => s + Number(i.amount), 0);
    const totalExpense = expenses.reduce((s, e) => s + Number(e.amount), 0);

    const byCategory = Object.values(ExpenseCategory).map((category) => ({
      category,
      total: expenses
        .filter((e) => e.category === category)
        .reduce((s, e) => s + Number(e.amount), 0),
    }));

    return {
      from,
      to,
      carId,
      totalIncome,
      totalExpense,
      profit: totalIncome - totalExpense,
      byCategory,
    };
  }

  async carRoi(carId: string, from: string, to: string) {
    const summary = await this.summary(from, to, carId);
    return {
      ...summary,
      roi: summary.totalExpense > 0 ? summary.profit / summary.totalExpense : null,
    };
  }

  async removeIncome(id: string) {
    const row = await this.prisma.income.findFirst({ where: { id, ...notDeleted() } });
    if (!row) throw new NotFoundException('Income not found');
    return this.prisma.income.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async removeExpense(id: string) {
    const row = await this.prisma.expense.findFirst({ where: { id, ...notDeleted() } });
    if (!row) throw new NotFoundException('Expense not found');
    return this.prisma.expense.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
