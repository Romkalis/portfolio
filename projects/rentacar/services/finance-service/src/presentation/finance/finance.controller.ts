import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FinanceService } from '../../application/finance/finance.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { CreateIncomeDto } from './dto/create-income.dto';

@ApiTags('finance')
@Controller({ path: 'finance', version: '1' })
export class FinanceController {
  constructor(private readonly finance: FinanceService) {}

  @Get('income')
  @ApiOperation({ summary: 'List income records' })
  listIncome(
    @Query('carId') carId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.finance.listIncome(carId, from, to);
  }

  @Get('expenses')
  @ApiOperation({ summary: 'List expense records' })
  listExpenses(
    @Query('carId') carId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.finance.listExpenses(carId, from, to);
  }

  @Post('income')
  @ApiOperation({ summary: 'Record income' })
  createIncome(@Body() dto: CreateIncomeDto) {
    return this.finance.createIncome(dto);
  }

  @Post('expenses')
  @ApiOperation({ summary: 'Record expense' })
  createExpense(@Body() dto: CreateExpenseDto) {
    return this.finance.createExpense(dto);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Profit summary for period' })
  summary(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('carId') carId?: string,
  ) {
    return this.finance.summary(from, to, carId);
  }

  @Get('cars/:carId/roi')
  @ApiOperation({ summary: 'ROI for a car in period' })
  carRoi(
    @Param('carId') carId: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.finance.carRoi(carId, from, to);
  }

  @Delete('income/:id')
  @ApiOperation({ summary: 'Soft delete income' })
  removeIncome(@Param('id') id: string) {
    return this.finance.removeIncome(id);
  }

  @Delete('expenses/:id')
  @ApiOperation({ summary: 'Soft delete expense' })
  removeExpense(@Param('id') id: string) {
    return this.finance.removeExpense(id);
  }
}
