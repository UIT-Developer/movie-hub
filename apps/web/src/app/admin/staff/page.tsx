'use client';

export const dynamic = 'force-dynamic';

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
  CreateStaffRequest,
  UpdateStaffRequest,
} from '@/libs/api/types';

const POSITIONS: { value: string; label: string }[] = [
  { value: 'CINEMA_MANAGER', label: 'Quản lý rạp chiếu phim' },
  { value: 'ASSISTANT_MANAGER', label: 'Trợ lý quản lý' },
  { value: 'TICKET_CLERK', label: 'Nhân viên bán vé' },
  { value: 'CONCESSION_STAFF', label: 'Nhân viên bán đồ ăn' },
  { value: 'USHER', label: 'Hướng dẫn khách' },
  { value: 'PROJECTIONIST', label: 'Chiếu phim' },
  { value: 'CLEANER', label: 'Nhân viên vệ sinh' },
  { value: 'SECURITY', label: 'Bảo vệ' },
];

const WORK_TYPES: { value: string; label: string }[] = [
  { value: 'FULL_TIME', label: 'Toàn thời gian' },
  { value: 'PART_TIME', label: 'Bán thời gian' },
  { value: 'CONTRACT', label: 'Hợp đồng' },
];

const SHIFT_TYPES: { value: string; label: string }[] = [
  { value: 'MORNING', label: 'Sáng' },
  { value: 'AFTERNOON', label: 'Chi\u1ec1u' },
  { value: 'NIGHT', label: '\u0110\u00eam' },
];

// Helper function to format date for input type="date"
const formatDateForInput = (dateValue: string | Date | undefined): string => {
  if (!dateValue) return '';
  try {
    const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
    if (isNaN(date.getTime())) return '';
    // Format as YYYY-MM-DD for input[type="date"]
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch {
    return '';
  }
};

// Helper function to ensure enum values are strings (handle numeric enums from API)
const ensureEnumString = (value: string | number | unknown): string => {
  if (typeof value === 'string') return value;
  // If numeric enum or unknown, convert to string
  return String(value);
};

// Helper function to validate UUID format (BE requires UUID for cinemaId)
const isValidUUID = (value: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
};

// Helper function to convert non-UUID cinemaId to UUID format (BE workaround)
// If cinemaId is already UUID, return as-is
// If cinemaId is a string like 'c_hcm_001', generate a deterministic UUID from it
const ensureUUIDFormat = (cinemaId: string): string => {
  if (isValidUUID(cinemaId)) {
    return cinemaId; // Already valid UUID
  }
  
  // Workaround: Convert non-UUID string to UUID format
  // Using a deterministic approach based on the input string
  // This is a temporary FE workaround until BE fixes UUID validation
  const hash = cinemaId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const paddedHash = String(hash).padStart(32, '0').slice(-32);
  const uuid = [
    paddedHash.slice(0, 8),
    paddedHash.slice(8, 12),
    paddedHash.slice(12, 16),
    paddedHash.slice(16, 20),
    paddedHash.slice(20, 32),
  ].join('-');
  
  console.warn(`[Staff Form] Cinema ID '${cinemaId}' is not valid UUID format. Generated UUID: ${uuid}`);
  return uuid;
};

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
    gender: 'MALE',
    dob: '',
    position: 'TICKET_CLERK',
    status: 'ACTIVE',
    workType: 'FULL_TIME',
    shiftType: 'MORNING',
    salary: 0,
    hireDate: '',
  });
  const { toast } = useToast();

  // API hooks
  const { data: cinemasData = [] } = useCinemas();
  const cinemas = Array.isArray(cinemasData) ? cinemasData : [];

  const { data: staffData = [], isLoading: loading, error } = useStaff({
    cinemaId: filterCinemaId !== 'all' ? filterCinemaId : undefined,
    status: filterStatus !== 'all' ? (filterStatus as unknown as StaffStatus) : undefined,
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
    // Validate required fields
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

    if (!formData.phone.trim() || formData.phone.trim().length < 9) {
      toast({
        title: 'Error',
        description: 'Phone number must be at least 9 characters',
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

    if (!formData.dob) {
      toast({
        title: 'Error',
        description: 'Date of birth is required',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.hireDate) {
      toast({
        title: 'Error',
        description: 'Hire date is required',
        variant: 'destructive',
      });
      return;
    }

    if (formData.salary < 0) {
      toast({
        title: 'Error',
        description: 'Salary cannot be negative',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Convert dates to ISO DateTime format for API
      // For date inputs, they're in YYYY-MM-DD format, need to parse carefully
      const dobDate = formData.dob ? new Date(formData.dob + 'T00:00:00Z') : null;
      const hireDateDate = formData.hireDate ? new Date(formData.hireDate + 'T00:00:00Z') : null;

      if (!dobDate || isNaN(dobDate.getTime())) {
        toast({
          title: 'Error',
          description: 'Invalid date of birth format',
          variant: 'destructive',
        });
        return;
      }

      if (!hireDateDate || isNaN(hireDateDate.getTime())) {
        toast({
          title: 'Error',
          description: 'Invalid hire date format',
          variant: 'destructive',
        });
        return;
      }

      if (editingStaff) {
        const updateData: UpdateStaffRequest = {
          fullName: formData.fullName,
          phone: formData.phone,
          gender: formData.gender as Gender | string,
          dob: dobDate.toISOString(),
          position: formData.position as StaffPosition | string,
          status: formData.status as StaffStatus | string,
          workType: formData.workType as WorkType | string,
          shiftType: formData.shiftType as ShiftType | string,
          salary: Math.floor(formData.salary),
          hireDate: hireDateDate.toISOString(),
        };
        await updateStaff.mutateAsync({ id: editingStaff.id, data: updateData });
      } else {
        const createData: CreateStaffRequest = {
          cinemaId: ensureUUIDFormat(formData.cinemaId),
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          gender: formData.gender as Gender | string,
          dob: dobDate.toISOString(),
          position: formData.position as StaffPosition | string,
          status: formData.status as StaffStatus | string,
          workType: formData.workType as WorkType | string,
          shiftType: formData.shiftType as ShiftType | string,
          salary: Math.floor(formData.salary),
          hireDate: hireDateDate.toISOString(),
        };
        await createStaff.mutateAsync(createData);
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
      gender: ensureEnumString(staffMember.gender),
      dob: formatDateForInput(staffMember.dob),
      position: ensureEnumString(staffMember.position),
      status: ensureEnumString(staffMember.status),
      workType: ensureEnumString(staffMember.workType),
      shiftType: ensureEnumString(staffMember.shiftType),
      salary: typeof staffMember.salary === 'string' ? parseFloat(staffMember.salary) : staffMember.salary,
      hireDate: formatDateForInput(staffMember.hireDate),
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa nhân viên này không?')) {
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

  const getStatusBadgeColor = (status: StaffStatus | string) => {
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
    totalSalaryExpense: staff.reduce((sum, s) => {
      const salary = typeof s.salary === 'string' ? parseFloat(s.salary) : (s.salary || 0);
      return sum + salary;
    }, 0),
    avgSalary: staff.length > 0 ? staff.reduce((sum, s) => {
      const salary = typeof s.salary === 'string' ? parseFloat(s.salary) : (s.salary || 0);
      return sum + salary;
    }, 0) / staff.length : 0,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
          <p className="text-gray-500 mt-1">Quản lý nhân viên và nhân viên rạp</p>
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

      {/* Statistics Cards with Modern Gradient Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200/60 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-purple-700 uppercase tracking-wider">👥 Total Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">{stats.total}</div>
            <p className="text-xs text-purple-600 mt-2 font-medium">
              {stats.active} active · {stats.inactive} inactive
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200/60 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-blue-700 uppercase tracking-wider">💼 Employment Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{stats.fullTime}</div>
            <p className="text-xs text-blue-600 mt-2 font-medium">
              {stats.fullTime} full-time · {stats.partTime} part-time
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200/60 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-yellow-700 uppercase tracking-wider">📍 Key Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-900">{stats.positions.manager}</div>
            <p className="text-xs text-yellow-600 mt-2 font-medium">
              {stats.positions.manager} managers · {stats.positions.ticketClerk} clerks
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200/60 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">💰 Salary Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-900">₫{(stats.totalSalaryExpense / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-emerald-600 mt-2 font-medium">
              Avg: ₫{(stats.avgSalary / 1000000).toFixed(2)}M per person
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Modern Filter Container */}
      <div className="p-4 bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50 rounded-lg border border-purple-200/50 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cinema Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">🏢 Cinema</label>
            <Select value={filterCinemaId} onValueChange={setFilterCinemaId}>
              <SelectTrigger className="h-11 border-purple-200 focus:ring-purple-500">
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

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">✅ Status</label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="h-11 border-purple-200 focus:ring-purple-500">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ACTIVE">✅ Active</SelectItem>
                <SelectItem value="INACTIVE">❌ Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {(filterCinemaId !== 'all' || filterStatus !== 'all') && (
          <div className="flex flex-wrap gap-2 pt-3 border-t border-purple-200/50">
            {filterCinemaId !== 'all' && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-purple-200 shadow-sm">
                <span className="text-xs font-medium text-gray-700">
                  🏢 {cinemas.find(c => c.id === filterCinemaId)?.name}
                </span>
                <button
                  onClick={() => setFilterCinemaId('all')}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            )}
            {filterStatus !== 'all' && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-purple-200 shadow-sm">
                <span className="text-xs font-medium text-gray-700">
                  ✅ {filterStatus === 'ACTIVE' ? 'Active' : 'Inactive'}
                </span>
                <button
                  onClick={() => setFilterStatus('all')}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            )}
            <button
              onClick={() => {
                setFilterCinemaId('all');
                setFilterStatus('all');
              }}
              className="text-xs font-medium text-purple-600 hover:text-purple-700 transition-colors ml-auto"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

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
                      <TableCell>${Number(staffMember.salary ?? 0).toLocaleString()}</TableCell>
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
                Phone *
              </Label>
              <div className="col-span-3">
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Min 9 characters"
                />
                {formData.phone && formData.phone.length < 9 && (
                  <p className="text-xs text-red-500 mt-1">Phone must be at least 9 characters</p>
                )}
              </div>
            </div>

            {/* Gender & DOB */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <div className="col-span-3 grid grid-cols-2 gap-4">
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
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
                  onValueChange={(value) => setFormData({ ...formData, position: value })}
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
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
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
                  onValueChange={(value) => setFormData({ ...formData, workType: value })}
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
                  onValueChange={(value) => setFormData({ ...formData, shiftType: value })}
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
                Salary *
              </Label>
              <Input
                id="salary"
                type="number"
                value={formData.salary || ''}
                onChange={(e) => setFormData({ ...formData, salary: parseFloat(e.target.value) || 0 })}
                placeholder="e.g., 10000000"
                className="col-span-3"
                min="0"
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
              disabled={createStaff.isPending || updateStaff.isPending || !formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || formData.phone.length < 9 || !formData.dob || !formData.hireDate || formData.salary < 0}
            >
              {createStaff.isPending || updateStaff.isPending ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
