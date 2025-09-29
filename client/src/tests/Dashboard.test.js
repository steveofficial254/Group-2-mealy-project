import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import { MealyProvider } from '../context/ContextProvider';

// Mock the context hook to provide test data
jest.mock('../context/ContextProvider', () => ({
  ...jest.requireActual('../context/ContextProvider'),
  useMealyContext: () => ({
    loading: false,
    error: null,
    dashboard: {
      totalOrders: 75,
      totalDelivered: 357,
      totalCanceled: 65,
      totalRevenue: 50000
    },
    reviews: [
      {
        id: 1,
        name: 'James',
        rating: 5,
        comment: 'Great food!',
        image: '/test-image.jpg',
        daysAgo: 2
      },
      {
        id: 2,
        name: 'Sofia',
        rating: 4,
        comment: 'Delicious meals',
        image: '/test-image2.jpg',
        daysAgo: 1
      },
      {
        id: 3,
        name: 'Anandreansyah',
        rating: 5,
        comment: 'Amazing cuisine',
        image: '/test-image3.jpg',
        daysAgo: 3
      }
    ],
    revenueData: [
      { name: 'Mon', revenue: 4000 },
      { name: 'Tue', revenue: 3000 },
      { name: 'Wed', revenue: 5000 },
      { name: 'Thu', revenue: 4500 },
      { name: 'Fri', revenue: 6000 },
      { name: 'Sat', revenue: 7000 },
      { name: 'Sun', revenue: 5500 }
    ],
    formatCurrency: (value) => `KSh ${value.toLocaleString()}`
  }),
  MealyProvider: ({ children }) => children
}));

// Mock recharts to avoid canvas issues in tests
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div data-testid="chart-container">{children}</div>,
  LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  PieChart: ({ children }) => <div data-testid="pie-chart">{children}</div>,
  Pie: () => <div data-testid="pie" />,
  Cell: () => <div data-testid="cell" />
}));

// Suppress React Router v7 warnings in tests
beforeAll(() => {
  const originalWarn = console.warn;
  jest.spyOn(console, 'warn').mockImplementation((message) => {
    if (message.includes('React Router Future Flag Warning')) {
      return;
    }
    originalWarn(message);
  });
});

afterAll(() => {
  console.warn.mockRestore();
});

const DashboardWrapper = ({ children }) => (
  <BrowserRouter>
    <MealyProvider>
      {children}
    </MealyProvider>
  </BrowserRouter>
);

describe('Dashboard Component', () => {
  test('renders dashboard title and welcome message', async () => {
    render(
      <DashboardWrapper>
        <Dashboard />
      </DashboardWrapper>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Karibu! Welcome back to Mealy Kenyan Cuisine Admin!')).toBeInTheDocument();
  });

  test('displays correct metric values from context', async () => {
    render(
      <DashboardWrapper>
        <Dashboard />
      </DashboardWrapper>
    );

    expect(screen.getByText('75')).toBeInTheDocument(); // Total Orders
    expect(screen.getByText('357')).toBeInTheDocument(); // Total Delivered
    expect(screen.getByText('65')).toBeInTheDocument(); // Total Canceled
    expect(screen.getByText('KSh 50,000')).toBeInTheDocument(); // Total Revenue
  });

  test('displays metric card titles', async () => {
    render(
      <DashboardWrapper>
        <Dashboard />
      </DashboardWrapper>
    );

    expect(screen.getByText('Total Orders')).toBeInTheDocument();
    expect(screen.getByText('Total Delivered')).toBeInTheDocument();
    expect(screen.getByText('Total Canceled')).toBeInTheDocument();
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
  });

  test('renders revenue chart', async () => {
    render(
      <DashboardWrapper>
        <Dashboard />
      </DashboardWrapper>
    );

    expect(screen.getByText('Weekly Revenue')).toBeInTheDocument();
    expect(screen.getByTestId('chart-container')).toBeInTheDocument();
  });

  test('displays customer reviews section', async () => {
    render(
      <DashboardWrapper>
        <Dashboard />
      </DashboardWrapper>
    );

    expect(screen.getByText('Customer Reviews')).toBeInTheDocument();
    expect(screen.getByText('James')).toBeInTheDocument();
    expect(screen.getByText('Sofia')).toBeInTheDocument();
    expect(screen.getByText('Anandreansyah')).toBeInTheDocument();
  });

  test('shows save dropdown when save button is clicked', async () => {
    render(
      <DashboardWrapper>
        <Dashboard />
      </DashboardWrapper>
    );

    const saveButton = screen.getByText('Save Report');
    fireEvent.click(saveButton);

    expect(screen.getByText('Export CSV')).toBeInTheDocument();
    expect(screen.getByText('Print Report')).toBeInTheDocument();
  });
});

// Test loading state separately with a different mock
describe('Dashboard Loading State', () => {
  test('shows loading state initially', () => {
    // Override the mock for this specific test
    jest.doMock('../context/ContextProvider', () => ({
      ...jest.requireActual('../context/ContextProvider'),
      useMealyContext: () => ({
        loading: true,
        error: null,
        dashboard: {},
        reviews: [],
        revenueData: [],
        formatCurrency: (value) => `KSh ${value.toLocaleString()}`
      }),
      MealyProvider: ({ children }) => children
    }));

    // Clear the module cache and re-require the component
    jest.resetModules();
    const LoadingDashboard = require('../components/Dashboard').default;
    
    render(
      <BrowserRouter>
        <LoadingDashboard />
      </BrowserRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});

