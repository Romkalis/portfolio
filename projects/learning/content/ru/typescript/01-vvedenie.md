---
title: TypeScript — введение
description: Зачем типы, примитивы, type vs interface, первый .ts файл
---

# TypeScript с нуля

## Кому этот урок

Вы пишете на JavaScript. **TypeScript (TS)** — тот же JS + **подсказки типов** до запуска. В CRM весь код в `.ts` / `.tsx`. За один урок вы поймёте, зачем это и как читать ошибки в редакторе.

## Что вы узнаете

- Зачем типы в большом проекте
- Примитивы и аннотации
- Массивы и объекты с типами
- `type` vs `interface`
- Как запустить проверку типов

---

## 1. Зачем TypeScript, если есть JS

| Без TS | С TS |
|--------|------|
| Опечатка `order.staus` — узнаете в runtime | Подчеркнёт в IDE сразу |
| Непонятно, что в `order` | Видны поля `status`, `totalAmount` |
| Рефакторинг страшно | Переименование безопаснее |

TS **не выполняется в браузере** — компилятор **стирает типы** и получается обычный JS.

---

## 2. Первый файл

`hello.ts`:

```typescript
const workshopName: string = "Автосервис";
let orderCount: number = 0;

function greet(name: string): string {
  return `Здравствуйте, ${name}`;
}
```

Проверка (в проекте learning или service):

```bash
npx tsc --noEmit hello.ts
```

Или смотрите красные подчёркивания в VS Code / Cursor.

---

## 3. Примитивы

```typescript
const title: string = "Замена масла";
const year: number = 2018;
const done: boolean = false;
const note: null = null;
const extra: undefined = undefined;
```

**Вывод типов** — можно не писать тип, если очевидно:

```typescript
const price = 3500; // number
```

Явная аннотация нужна, когда TypeScript не угадывает:

```typescript
let status: "PENDING" | "COMPLETED" = "PENDING";
```

---

## 4. Массивы

```typescript
const tags: string[] = ["срочно", "гарантия"];
const ids: Array<number> = [1, 2, 3];

const orders: { id: number; status: string }[] = [
  { id: 1, status: "PENDING" },
];
```

---

## 5. type — именованная форма данных

```typescript
type OrderStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

type Order = {
  id: number;
  title: string;
  status: OrderStatus;
  totalAmount: number;
};

const order: Order = {
  id: 1,
  title: "Диагностика",
  status: "PENDING",
  totalAmount: 2000,
};
```

**Union** `"A" | "B"` — только эти строки, как enum в CRM.

---

## 6. interface — почти то же для объектов

```typescript
interface Owner {
  id: string;
  lastName: string;
  firstName: string;
  phone: string | null;
}
```

| | `type` | `interface` |
|---|--------|-------------|
| Объекты | да | да |
| Union, примитивы | да | нет |
| Расширение | `&` | `extends` |

В CRM: модели Prisma генерируют типы; свои формы — `type` / `interface` в `validators` и UI.

---

## 7. any — избегайте

```typescript
let data: any = fetchSomething();
data.foo.bar; // TS молчит, в runtime — падение
```

Лучше `unknown` + проверка, или нормальный тип.

---

## 8. Связь с CRM

- `prisma/schema.prisma` → после `prisma generate` типы `Order`, `Owner`
- `orderCreateSchema` (Zod) выводит тип `z.infer<typeof schema>`
- Server Actions: `(data: OrderCreateInput) => ...`

---

## Шпаргалка

```
: string  : number  : boolean
type X = { ... }
interface Y { ... }
"A" | "B"   union
T[]         массив
```

---

## Задания

### 1. Тип Car (10 мин)

Опишите `type Car` с `id`, `brand`, `model`, `year`, `vin` (string | null). Создайте константу `myCar: Car`.

### 2. OrderStatus (10 мин)

Union из трёх статусов. Функция `isCompleted(s: OrderStatus): boolean`.

### 3. Ошибка намеренно (5 мин)

Присвойте `status: "DONE"` — прочитайте текст ошибки TS. Исправьте.

### 4. Массив Owner (15 мин)

`type Owner`, массив из 2 владельцев, функция `findByPhone(owners, phone): Owner | undefined`.

### 5. ⭐ Откройте `projects/service/src/shared/lib/validators.ts` — найдите один `z.infer` или тип из Zod. Скопируйте в заметки, что он описывает.

---

## Дальше

→ [Интерфейсы и утилиты](./02-interfeysy.md)
