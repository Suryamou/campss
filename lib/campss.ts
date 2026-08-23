export const BOOKING_STORAGE_KEY = "campss_booking_draft";
export const HISTORY_STORAGE_KEY = "campss_booking_history";
export const USER_STORAGE_KEY = "campss_user";
export const MOCK_REPOSITORY_KEY = "campss_mock_repository";
export const QUOTA_STORAGE_KEY = "campss_quotas";
export const PRICE_PER_PERSON = 40000;

export type BookingStatus =
  | "PENDING_PAYMENT"
  | "PAYMENT_SUBMITTED"
  | "WAITING_VERIFICATION"
  | "VERIFIED"
  | "REJECTED"
  | "ACTIVE"
  | "CHECKED_IN"
  | "COMPLETED";

export type BookingDraft = {
  bookingId: string;
  userId: string;
  date: string;
  dateLabel: string;
  route: string;
  leader: {
    name: string;
    email: string;
    phone: string;
    identityType: string;
    identityNumber: string;
  };
  participantCount: number;
  pricePerPerson: number;
  total: number;
  status: BookingStatus;
  paymentProofName?: string;
  createdAt: string;
};

export type QuotaSchedule = {
  date: string;
  dateLabel: string;
  day: string;
  status: "OPEN" | "CLOSED";
  availableQuota: number;
  maxQuota: number;
};

export const quotaSchedules: QuotaSchedule[] = [
  { date: "2026-08-12", dateLabel: "12 Agustus 2026", day: "SEL", status: "OPEN", availableQuota: 70, maxQuota: 100 },
  { date: "2026-08-13", dateLabel: "13 Agustus 2026", day: "RAB", status: "OPEN", availableQuota: 42, maxQuota: 100 },
  { date: "2026-08-14", dateLabel: "14 Agustus 2026", day: "KAM", status: "OPEN", availableQuota: 8, maxQuota: 100 },
  { date: "2026-08-15", dateLabel: "15 Agustus 2026", day: "JUM", status: "CLOSED", availableQuota: 0, maxQuota: 100 },
];

export type MockRepository = {
  users: Array<{ id: string; name: string; email: string; phone?: string; role: "user" }>;
  bookings: BookingDraft[];
  payments: Array<{ bookingId: string; status: BookingStatus; proofName?: string }>;
  tickets: Array<{ bookingId: string; status: BookingStatus }>;
  quotas: QuotaSchedule[];
};

export function emptyMockRepository(): MockRepository {
  return { users: [], bookings: [], payments: [], tickets: [], quotas: quotaSchedules };
}

export function readMockRepository(): MockRepository {
  if (typeof window === "undefined") return emptyMockRepository();
  try {
    const value = window.sessionStorage.getItem(MOCK_REPOSITORY_KEY);
    return value ? (JSON.parse(value) as MockRepository) : emptyMockRepository();
  } catch {
    return emptyMockRepository();
  }
}

export function saveMockRepository(repository: MockRepository) {
  window.sessionStorage.setItem(MOCK_REPOSITORY_KEY, JSON.stringify(repository));
}

export function updateMockRepository(
  updater: (repository: MockRepository) => MockRepository
) {
  const updated = updater(readMockRepository());
  saveMockRepository(updated);
  return updated;
}

export function readUser() {
  if (typeof window === "undefined") return null;
  try {
    const value = window.sessionStorage.getItem(USER_STORAGE_KEY);
    return value ? (JSON.parse(value) as { id: string; name: string; email: string; phone?: string; role: "user" }) : null;
  } catch {
    return null;
  }
}

export function readQuotas(): QuotaSchedule[] {
  if (typeof window === "undefined") return quotaSchedules;
  try {
    const value = window.sessionStorage.getItem(QUOTA_STORAGE_KEY);
    return value ? (JSON.parse(value) as QuotaSchedule[]) : quotaSchedules;
  } catch {
    return quotaSchedules;
  }
}

export function saveQuotas(quotas: QuotaSchedule[]) {
  window.sessionStorage.setItem(QUOTA_STORAGE_KEY, JSON.stringify(quotas));
  updateMockRepository((repository) => ({ ...repository, quotas }));
}

export function readBooking(): BookingDraft | null {
  if (typeof window === "undefined") return null;

  try {
    const value = window.sessionStorage.getItem(BOOKING_STORAGE_KEY);
    return value ? (JSON.parse(value) as BookingDraft) : null;
  } catch {
    return null;
  }
}

export function saveBooking(booking: BookingDraft) {
  window.sessionStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(booking));
  updateMockRepository((repository) => ({
    ...repository,
    bookings: [booking, ...repository.bookings.filter((item) => item.bookingId !== booking.bookingId)],
    payments: repository.payments.some((item) => item.bookingId === booking.bookingId)
      ? repository.payments
      : [...repository.payments, { bookingId: booking.bookingId, status: booking.status }],
    tickets: repository.tickets.some((item) => item.bookingId === booking.bookingId)
      ? repository.tickets
      : [...repository.tickets, { bookingId: booking.bookingId, status: booking.status }],
  }));
}

export function updateBooking(patch: Partial<BookingDraft>) {
  const booking = readBooking();
  if (!booking) return null;

  const updated = { ...booking, ...patch };
  saveBooking(updated);
  return updated;
}

export function updateBookingStatus(bookingId: string, status: BookingStatus) {
  const repository = updateMockRepository((current) => ({
    ...current,
    bookings: current.bookings.map((booking) =>
      booking.bookingId === bookingId ? { ...booking, status } : booking
    ),
    payments: current.payments.map((payment) =>
      payment.bookingId === bookingId ? { ...payment, status } : payment
    ),
    tickets: current.tickets.map((ticket) =>
      ticket.bookingId === bookingId ? { ...ticket, status } : ticket
    ),
  }));
  const booking = repository.bookings.find((item) => item.bookingId === bookingId) || null;
  if (booking && readBooking()?.bookingId === bookingId) {
    window.sessionStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(booking));
  }
  if (booking) {
    const history = readBookingHistory().filter((item) => item.bookingId !== bookingId);
    window.sessionStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify([booking, ...history])
    );
  }
  return booking;
}

export function readBookingHistory(): BookingDraft[] {
  if (typeof window === "undefined") return [];

  try {
    const value = window.sessionStorage.getItem(HISTORY_STORAGE_KEY);
    return value ? (JSON.parse(value) as BookingDraft[]) : [];
  } catch {
    return [];
  }
}

export function saveBookingToHistory(booking: BookingDraft) {
  const history = readBookingHistory().filter(
    (item) => item.bookingId !== booking.bookingId
  );
  window.sessionStorage.setItem(
    HISTORY_STORAGE_KEY,
    JSON.stringify([booking, ...history])
  );
}

export function formatCurrency(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}
