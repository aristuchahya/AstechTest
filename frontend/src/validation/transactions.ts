import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["Pemasukan", "Pengeluaran"]).default("Pemasukan"),
  category: z.string().min(1, "Kategori harus diisi"),
  amount: z.number().min(0, "Jumlah harus diisi"),
  transaction_date: z.string().min(1, "Tgl. Transaksi harus diisi"),
});
