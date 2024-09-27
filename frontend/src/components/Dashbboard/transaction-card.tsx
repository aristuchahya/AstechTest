import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteTransaction,
  useFetchTransaction,
} from "@/hooks/useTransaction";
import { Trash2 } from "lucide-react";

export default function TransactionCard() {
  const { data, isLoading } = useFetchTransaction();
  const deleteMutation = useDeleteTransaction();

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Card className="xl:col-span-2">
        <CardHeader className="">
          <div className="grid gap-2">
            <CardTitle>Transaksi</CardTitle>
            <CardDescription>
              Riwayat Transaksi Pemasukan/Pengeluaran.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Tipe</TableHead>
                <TableHead className="w-[100px]">Kategori</TableHead>
                <TableHead className="w-[150px]">Tanggal Transaksi</TableHead>
                <TableHead>Biaya</TableHead>
                <TableHead className="hidden w-[100px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-start">{item.type}</TableCell>
                  <TableCell className="text-start">{item.category}</TableCell>
                  <TableCell className="text-start">
                    {item.transaction_date}
                  </TableCell>
                  <TableCell className="text-start">Rp{item.amount}</TableCell>
                  <TableCell>
                    <Trash2
                      className="cursor-pointer"
                      onClick={() => handleDelete(item.id)}
                      color="red"
                      size={20}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="text-start">
                  Total
                </TableCell>
                <TableCell>Rp.{data?.[data.length - 1]?.total}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
