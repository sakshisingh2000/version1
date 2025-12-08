import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Banknote, Users, CheckCircle, Hourglass } from 'lucide-react';

const applications = [
  { id: 'APP-1024', customer: 'Rohan Sharma', amount: 50000, status: 'Disbursed', date: '2024-07-20' },
  { id: 'APP-1023', customer: 'Priya Singh', amount: 120000, status: 'In Review', date: '2024-07-20' },
  { id: 'APP-1022', customer: 'Amit Patel', amount: 75000, status: 'Disbursed', date: '2024-07-19' },
  { id: 'APP-1021', customer: 'Sunita Rao', amount: 25000, status: 'Rejected', date: '2024-07-19' },
  { id: 'APP-1020', customer: 'Vikram Mehta', amount: 200000, status: 'Disbursed', date: '2024-07-18' },
];

export default function AdminDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="font-headline text-3xl font-bold tracking-tight mb-6">
        Admin Dashboard
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Disbursed</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹ 4,52,31,890</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Borrowers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Applications</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Hourglass className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>
            A list of the most recent loan applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.id}</TableCell>
                  <TableCell>{app.customer}</TableCell>
                  <TableCell>₹{app.amount.toLocaleString('en-IN')}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        app.status === 'Disbursed'
                          ? 'default'
                          : app.status === 'In Review'
                          ? 'secondary'
                          : 'destructive'
                      }
                      className={app.status === 'Disbursed' ? 'bg-accent text-accent-foreground' : ''}
                    >
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{app.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
