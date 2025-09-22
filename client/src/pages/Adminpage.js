import React from "react";

const AdminPage = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          background: "hsl(var(--muted))",
          padding: "2rem 1rem",
          borderRight: "1px solid hsl(var(--border))",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "2rem",
            color: "hsl(var(--foreground))",
          }}
        >
          Admin Panel
        </h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <button style={navButtonStyle}>📦 Orders</button>
          <button style={navButtonStyle}>🍴 Restaurants</button>
          <button style={navButtonStyle}>📊 Analytics</button>
          <button style={navButtonStyle}>⚙️ Settings</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "3rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "hsl(var(--foreground))",
            marginBottom: "1rem",
          }}
        >
          <span style={{ color: "hsl(var(--primary))" }}>Admin</span> Dashboard
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "hsl(var(--muted-foreground))",
            marginBottom: "2rem",
          }}
        >
          Manage your restaurant operations and orders
        </p>

        {/* Dashboard Widgets */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <div style={widgetStyle}>
            <h3 style={widgetTitle}>📦 Orders</h3>
            <p style={widgetText}>15 new orders today</p>
          </div>
          <div style={widgetStyle}>
            <h3 style={widgetTitle}>🍴 Restaurants</h3>
            <p style={widgetText}>8 active partners</p>
          </div>
          <div style={widgetStyle}>
            <h3 style={widgetTitle}>📊 Analytics</h3>
            <p style={widgetText}>+12% growth this week</p>
          </div>
        </div>
      </main>
    </div>
  );
};

// Styles (to keep code clean)
const navButtonStyle = {
  padding: "0.75rem 1rem",
  background: "transparent",
  border: "1px solid hsl(var(--border))",
  borderRadius: "0.5rem",
  cursor: "pointer",
  textAlign: "left",
  color: "hsl(var(--foreground))",
  fontSize: "1rem",
};

const widgetStyle = {
  background: "hsl(var(--muted))",
  padding: "1.5rem",
  borderRadius: "0.75rem",
  color: "hsl(var(--foreground))",
};

const widgetTitle = {
  fontSize: "1.25rem",
  fontWeight: "bold",
  marginBottom: "0.5rem",
};

const widgetText = {
  color: "hsl(var(--muted-foreground))",
};

export default AdminPage;