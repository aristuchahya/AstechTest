import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useAddTransaction } from "@/hooks/useTransaction";

export function CardForm() {
  const [date, setDate] = useState<Date>();
  const [type, setType] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const { register, onSubmit, handleSubmit, errors, setValue } =
    useAddTransaction();

  const pemasukanCategories = ["Gaji", "Investasi", "Freelance"];
  const pengeluaranCategories = ["Hutang", "Baju", "Kesehatan", "Listrik"];

  useEffect(() => {
    if (type === "Pemasukan") {
      setCategories(pemasukanCategories);
    } else if (type === "Pengeluaran") {
      setCategories(pengeluaranCategories);
    } else {
      setCategories([]);
    }
  }, [type]);
  return (
    <div className="ms-16 my-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Buat Transaksi</CardTitle>
          <CardDescription>Simpan data transaksi.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex justify-between gap-2">
                <div className="flex flex-col space-y-1.5 w-1/2">
                  <Select
                    onValueChange={(value) => {
                      setType(value);
                      setValue("type", value);
                    }}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Pilih Tipe" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Pemasukan">Pemasukan</SelectItem>
                      <SelectItem value="Pengeluaran">Pengeluaran</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <p className="text-red-500 text-[10px]">
                      {errors.type.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1.5 w-1/2">
                  <Select
                    onValueChange={(value) => setValue("category", value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Pilih Category" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-red-500 text-[10px]">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between gap-2">
                <div className="flex flex-col space-y-1.5 w-1/2">
                  <Input
                    id="amount"
                    placeholder="Rp."
                    {...register("amount", { valueAsNumber: true })}
                  />
                  {errors.amount && (
                    <p className="text-red-500 text-[10px]">
                      {errors.amount.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5 w-1/2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          " justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className=" h-3 w-3" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(selectedDate) => {
                          setDate(selectedDate);
                          setValue(
                            "transaction_date",
                            selectedDate?.toISOString() || ""
                          );
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button>Simpan</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
