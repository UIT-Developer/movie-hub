'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Users, Filter } from 'lucide-react';
import { Button } from '@movie-hub/shacdn-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@movie-hub/shacdn-ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@movie-hub/shacdn-ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@movie-hub/shacdn-ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@movie-hub/shacdn-ui/select';
import { Label } from '@movie-hub/shacdn-ui/label';
import { Input } from '@movie-hub/shacdn-ui/input';
import { Badge } from '@movie-hub/shacdn-ui/badge';
import { useToast } from '../_libs/use-toast';
import {
  useStaff,
  useCreateStaff,
  useUpdateStaff,
  useDeleteStaff,
  useCinemas,
} from '@/libs/api';
import type {
  Staff,
  Gender,
  StaffStatus,
  WorkType,
  ShiftType,
  StaffPosition,
} from '@/libs/api/types';

const POSITIONS: { value: StaffPosition; label: string }[] = [
  { value: 'CINEMA_MANAGER', label: 'Cinema Manager' },
  { value: 'ASSISTANT_MANAGER', label: 'Assistant Manager' },
  { value: 'TICKET_CLERK', label: 'Ticket Clerk' },
  { value: 'CONCESSION_STAFF', label: 'Concession Staff' },
  { value: 'USHER', label: 'Usher' },
  { value: 'PROJECTIONIST', label: 'Projectionist' },
  { value: 'CLEANER', label: 'Cleaner' },
  { value: 'SECURITY', label: 'Security' },
];

const WORK_TYPES: { value: WorkType; label: string }[] = [
  { value: 'FULL_TIME', label: 'Full Time' },
  { value: 'PART_TIME', label: 'Part Time' },
  { value: 'CONTRACT', label: 'Contract' },
];

const SHIFT_TYPES: { value: ShiftType; label: string }[] = [
  { value: 'MORNING', label: 'Morning' },
  { value: 'AFTERNOON', label: 'Afternoon' },
  { value: 'NIGHT', label: 'Night' },
];

export default function StaffPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [filterCinemaId, setFilterCinemaId] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [formData, setFormData] = useState({
    cinemaId: '',
    fullName: '',
    email: '',
    phone: '',
    gender: 'MALE' as Gender,
    dob: '',
    position: 'TICKET_CLERK' as StaffPosition,
    status: 'ACTIVE' as StaffStatus,
    workType: 'FULL_TIME' as WorkType,
    shiftType: 'MORNING' as ShiftType,
    salary: 0,
    hireDate: '',
  });
  const { toast } = useToast();

  // API hooks
  const { data: cinemasData = [] } = useCinemas();
  const cinemas = Array.isArray(cinemasData) ? cinemasData : [];

  const { data: staffData = [], isLoading: loading, error } = useStaff({
    cinemaId: filterCinemaId !== 'all' ? filterCinemaId : undefined,
    status: filterStatus !== 'all' ? (filterStatus as StaffStatus) : undefined,
  });
  const staff = staffData || [];

  const createStaff = useCreateStaff();
  const updateStaff = useUpdateStaff();
  const deleteStaff = useDeleteStaff();

  // Show error toast if query fails
  if (error) {
    toast({
      title: 'Error',
      description: 'Failed to fetch staff',
      variant: 'destructive',
    });
  }

  const handleSubmit = async () => {
    if (!formData.fullName.trim()) {
      toast({
        title: 'Error',
        description: 'Full name is required',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.email.trim()) {
      toast({
        title: 'Error',
        description: 'Email is required',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.cinemaId && !editingStaff) {
      toast({
        title: 'Error',
        description: 'Cinema is required',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (editingStaff) {
        // Update existing staff
        const { cinemaId, email, ...updateData } = formData;
        await updateStaff.mutateAsync({ id: editingStaff.id, data: updateData });
      } else {
        // Create new staff
        await createStaff.mutateAsync(formData);
      }
      setDialogOpen(false);
      resetForm();
    } catch {
      // Error toast already shown by mutation hooks
    }
  };

  const handleEdit = (staffMember: Staff) => {
    setEditingStaff(staffMember);
    setFormData({
      cinemaId: staffMember.cinemaId,
      fullName: staffMember.fullName,
      email: staffMember.email,
      phone: staffMember.phone,
      gender: staffMember.gender,
      dob: typeof staffMember.dob === 'string' ? staffMember.dob.split('T')[0] : '',
      position: staffMember.position,
      status: staffMember.status,
      workType: staffMember.workType,
      shiftType: staffMember.shiftType,
      salary: staffMember.salary,
      hireDate: typeof staffMember.hireDate === 'string' ? staffMember.hireDate.split('T')[0] : '',
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this staff member?')) {
      return;
    }

    try {
      await deleteStaff.mutateAsync(id);
    } catch {
      // Error toast already shown by mutation hook
    }
  };

  const resetForm = () => {
    setEditingStaff(null);
    setFormData({
      cinemaId: '',
      fullName: '',
      email: '',
      phone: '',
      gender: 'MALE',
      dob: '',
      position: 'TICKET_CLERK',
      status: 'ACTIVE',
      workType: 'FULL_TIME',
      shiftType: 'MORNING',
      salary: 0,
      hireDate: '',
    });
  };

  const getStatusBadgeColor = (status: StaffStatus) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate statistics
  const stats = {
    total: staff.length,
    active: staff.filter((s) => s.status === 'ACTIVE').length,
    inactive: staff.filter((s) => s.status === 'INACTIVE').length,
    fullTime: staff.filter((s) => s.workType === 'FULL_TIME').length,
    partTime: staff.filter((s) => s.workType === 'PART_TIME').length,
    positions: {
      manager: staff.filter((s) => s.position === 'CINEMA_MANAGER').length,
      assistantManager: staff.filter((s) => s.position === 'ASSISTANT_MANAGER').length,
      ticketClerk: staff.filter((s) => s.position === 'TICKET_CLERK').length,
    },
    totalSalaryExpense: staff.reduce((sum, s) => sum + (s.salary || 0), 0),
    avgSalary: staff.length > 0 ? staff.reduce((sum, s) => sum + (s.salary || 0), 0) / staff.length : 0,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
          <p className="text-gray-500 mt-1">Manage cinema staff and employees</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setDialogOpen(true);
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Staff Member
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.active} active · {stats.inactive} inactive
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Employment Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.fullTime}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.fullTime} full-time · {stats.partTime} part-time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Key Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.positions.manager}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.positions.manager} managers · {stats.positions.ticketClerk} ticket clerks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Salary Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(stats.totalSalaryExpense / 1000).toFixed(1)}k</div>
            <p className="text-xs text-gray-500 mt-1">
              Avg: ${(stats.avgSalary / 1000).toFixed(1)}k per person
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="filter-cinema">Cinema</Label>
              <Select value={filterCinemaId} onValueChange={setFilterCinemaId}>
                <SelectTrigger id="filter-cinema">
                  <SelectValue placeholder="All Cinemas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cinemas</SelectItem>
                  {cinemas.map((cinema) => (
                    <SelectItem key={cinema.id} value={cinema.id}>
                      {cinema.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="filter-status">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger id="filter-status">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Members</CardTitle>
          <CardDescription>
            {staff.length} staff member{staff.length !== 1 ? 's' : ''} in total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-500">Loading staff...</p>
            </div>
          ) : staff.length === 0 ? (
            <div className="text-center py-16">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No staff members found.</p>
              <Button
                onClick={() => {
                  resetForm();
                  setDialogOpen(true);
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add First Staff Member
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Work Type</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((staffMember) => (
                    <TableRow key={staffMember.id}>
                      <TableCell className="font-medium">{staffMember.fullName}</TableCell>
                      <TableCell>{staffMember.email}</TableCell>
                      <TableCell>{staffMember.phone}</TableCell>
                      <TableCell>
                        {POSITIONS.find((p) => p.value === staffMember.position)?.label || staffMember.position}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(staffMember.status)}>
                          {staffMember.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {WORK_TYPES.find((w) => w.value === staffMember.workType)?.label || staffMember.workType}
                      </TableCell>
                      <TableCell>${staffMember.salary.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(staffMember)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(staffMember.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingStaff ? 'Edit Staff Member' : 'Add Staff Member'}
            </DialogTitle>
            <DialogDescription>
              {editingStaff ? 'Update staff member information' : 'Add a new staff member to the cinema'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Cinema */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cinema" className="text-right">
                Cinema *
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.cinemaId}
                  onValueChange={(value) => setFormData({ ...formData, cinemaId: value })}
                  disabled={!!editingStaff}
                >
                  <SelectTrigger id="cinema">
                    <SelectValue placeholder="Select cinema" />
                  </SelectTrigger>
                  <SelectContent>
                    {cinemas.map((cinema) => (
                      <SelectItem key={cinema.id} value={cinema.id}>
                        {cinema.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Full Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                Full Name *
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="col-span-3"
              />
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="col-span-3"
                disabled={!!editingStaff}
              />
            </div>

            {/* Phone */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="col-span-3"
              />
            </div>

            {/* Gender & DOB */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <div className="col-span-3 grid grid-cols-2 gap-4">
                <Select
                  value={formData.gender}
                  onValueChange={(value: Gender) => setFormData({ ...formData, gender: value })}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                />
              </div>
            </div>

            {/* Position */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Position
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.position}
                  onValueChange={(value: StaffPosition) => setFormData({ ...formData, position: value })}
                >
                  <SelectTrigger id="position">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    {POSITIONS.map((pos) => (
                      <SelectItem key={pos.value} value={pos.value}>
                        {pos.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Status */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.status}
                  onValueChange={(value: StaffStatus) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Work Type */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="workType" className="text-right">
                Work Type
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.workType}
                  onValueChange={(value: WorkType) => setFormData({ ...formData, workType: value })}
                >
                  <SelectTrigger id="workType">
                    <SelectValue placeholder="Select work type" />
                  </SelectTrigger>
                  <SelectContent>
                    {WORK_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Shift Type */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shiftType" className="text-right">
                Shift Type
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.shiftType}
                  onValueChange={(value: ShiftType) => setFormData({ ...formData, shiftType: value })}
                >
                  <SelectTrigger id="shiftType">
                    <SelectValue placeholder="Select shift type" />
                  </SelectTrigger>
                  <SelectContent>
                    {SHIFT_TYPES.map((shift) => (
                      <SelectItem key={shift.value} value={shift.value}>
                        {shift.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Salary */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="salary" className="text-right">
                Salary
              </Label>
              <Input
                id="salary"
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: parseFloat(e.target.value) || 0 })}
                className="col-span-3"
              />
            </div>

            {/* Hire Date */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hireDate" className="text-right">
                Hire Date
              </Label>
              <Input
                id="hireDate"
                type="date"
                value={formData.hireDate}
                onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDialogOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-600 to-pink-600"
              disabled={createStaff.isPending || updateStaff.isPending}
            >
              {createStaff.isPending || updateStaff.isPending ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
