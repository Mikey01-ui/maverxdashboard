import React, { useState, useEffect } from "react";
import {
  Settings,
  Users,
  UserPlus,
  Laptop,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  ArrowUpRight,
  Play,
  Pause,
  Timer,
  Check,
  Zap,
  MessageSquare,
  PenTool,
  Link2,
} from "lucide-react";

interface TaskItem {
  id: number;
  title: string;
  time: string;
  icon: React.ElementType;
  completed: boolean;
}

export function MaverxDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [expandedSection, setExpandedSection] = useState<string | null>("devices");

  // Interactive Timer
  const [timerRunning, setTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(155); // 02:35 = 155s

  useEffect(() => {
    let interval: any = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Interactive Tasks - 5 items matching the reference design exactly
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 1, title: "Interview", time: "Sep 13, 08:30", icon: Laptop, completed: true },
    { id: 2, title: "Team Meeting", time: "Sep 13, 10:30", icon: Zap, completed: true },
    { id: 3, title: "Project Update", time: "Sep 13, 13:00", icon: MessageSquare, completed: false },
    { id: 4, title: "Discuss Q3 Goals", time: "Sep 13, 14:45", icon: PenTool, completed: false },
    { id: 5, title: "HR Policy Review", time: "Sep 13, 16:30", icon: Link2, completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  const toggleAccordion = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  // Navigation Items
  const navTabs = [
    "Dashboard",
    "People",
    "Hiring",
    "Devices",
    "Apps",
    "Salary",
    "Calendar",
    "Reviews",
  ];

  // Radial tachymeter ticks for the circular gauge (unprogressed portion)
  const ticks = Array.from({ length: 22 }, (_, i) => {
    const angle = 160 + (i * 190) / 21;
    return angle;
  });

  return (
    <div className="min-h-screen w-full font-sans text-neutral-900 antialiased selection:bg-emerald-300 selection:text-neutral-900 relative overflow-x-hidden bg-[#f4fbf7]">
      {/* ===================== ANIMATED AMBIENT MESH GRADIENTS ===================== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0" aria-hidden="true">
        {/* Base diagonal green wash */}
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: "linear-gradient(135deg, #f4fbf7 0%, #edfcf2 30%, #e6f9ed 55%, #daf6e4 80%, #bbf0cf 100%)",
          }}
        />

        {/* Top-Left Ambient Emerald Orb 1 */}
        <div
          className="absolute -top-[18%] -left-[12%] w-[750px] h-[750px] rounded-full blur-[100px] opacity-70 animate-ambient-orange"
          style={{
            background: "radial-gradient(circle, #34d399 0%, #a7f3d0 42%, rgba(167, 243, 208, 0.20) 68%, transparent 80%)",
          }}
        />

        {/* Top-Left Pulsing Mint Halo */}
        <div
          className="absolute top-[2%] -left-[4%] w-[520px] h-[520px] rounded-full blur-[90px] opacity-55 animate-ambient-warm"
          style={{
            background: "radial-gradient(circle, #6ee7b7 0%, #d1fae5 45%, rgba(209, 250, 229, 0) 75%)",
          }}
        />

        {/* Middle-Right Floating Jade Orb */}
        <div
          className="absolute top-[18%] -right-[14%] w-[820px] h-[820px] rounded-full blur-[110px] opacity-65 animate-ambient-purple"
          style={{
            background: "radial-gradient(circle, #10b981 0%, #6ee7b7 40%, rgba(110, 231, 183, 0.25) 65%, transparent 75%)",
          }}
        />

        {/* Lower-Right Vivid Forest / Emerald Accent Orb */}
        <div
          className="absolute -bottom-[10%] right-[2%] w-[700px] h-[700px] rounded-full blur-[95px] opacity-70 animate-ambient-accent-purple"
          style={{
            background: "radial-gradient(circle, #059669 0%, #34d399 45%, rgba(52, 211, 153, 0.18) 70%, transparent 80%)",
          }}
        />

        {/* Bottom-Left Sage / Mint Mist */}
        <div
          className="absolute -bottom-[8%] left-[12%] w-[550px] h-[550px] rounded-full blur-[100px] opacity-45 animate-ambient-lavender"
          style={{
            background: "radial-gradient(circle, #a7f3d0 0%, rgba(167, 243, 208, 0) 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto p-6 sm:p-8 lg:p-10 flex flex-col gap-2">
        {/* ===================== TOP NAVIGATION BAR ===================== */}
        <header className="flex flex-wrap items-center justify-between gap-4 pb-5">
          {/* Logo */}
          <div className="flex items-center">
            <div className="border border-black/[0.12] rounded-full px-5 py-1.5 text-[17px] font-semibold tracking-tight text-[#1a1a1a] bg-white/50 backdrop-blur-xs shadow-xs">
              Miltomy
            </div>
          </div>

          {/* Navigation links & right action buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <nav className="flex items-center gap-1 sm:gap-4 bg-transparent">
              {navTabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[13px] transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#1c1e21] text-white px-4 py-1.5 rounded-full font-normal shadow-xs"
                        : "text-[#555a63] hover:text-[#111] px-1.5 py-1.5 font-normal"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Control: Setting (matching navbar size) */}
            <div className="flex items-center pl-1">
              <button className="border border-black/[0.12] rounded-full px-4 py-1.5 text-[13px] font-normal text-neutral-800 flex items-center gap-1.5 bg-white/40 hover:bg-white/60 transition-colors shadow-xs cursor-pointer">
                <Settings size={13} strokeWidth={1.5} className="text-neutral-700" />
                <span>Setting</span>
              </button>
            </div>
          </div>
        </header>

        {/* ===================== GREETING & METRICS PIPELINE ROW ===================== */}
        <section className="pt-2 pb-5">
          <h1 className="text-[34px] sm:text-[38px] font-normal tracking-tight text-[#161719] leading-tight mb-4">
            Welcome in, Milton
          </h1>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            {/* Left side: Segmented Status Pipeline */}
            <div className="flex flex-col">
              {/* Labels directly positioned above the pills */}
              <div className="flex items-center text-[11px] font-normal text-[#666] mb-1.5 pl-1">
                <span className="w-[62px] text-center">Interviews</span>
                <span className="w-[62px] text-center ml-2">Hired</span>
                <span className="w-60 sm:w-72 text-left pl-3 ml-2">Project time</span>
                <span className="w-[62px] text-center ml-2">Output</span>
              </div>

              {/* Pipeline Pills */}
              <div className="flex items-center gap-2">
                {/* Interviews 15% dark pill */}
                <div className="bg-[#24272c] text-white text-[12px] font-medium px-4 py-1.5 rounded-full w-[62px] text-center shadow-xs">
                  15%
                </div>

                {/* Hired 15% brand green pill */}
                <div className="bg-[#c8ff00] text-[#0a0a0a] text-[12px] font-semibold px-4 py-1.5 rounded-full w-[62px] text-center shadow-xs">
                  15%
                </div>

                {/* Project time 60% translucent diagonal striped pill */}
                <div
                  className="rounded-full px-4 py-1.5 text-[12px] font-medium text-[#1c1e21] w-60 sm:w-72 flex items-center shadow-xs"
                  style={{
                    background: `repeating-linear-gradient(
                      -45deg,
                      rgba(255, 255, 255, 0.92),
                      rgba(255, 255, 255, 0.92) 3.5px,
                      rgba(167, 243, 208, 0.45) 3.5px,
                      rgba(167, 243, 208, 0.45) 7px
                    )`,
                    border: "1px solid rgba(255, 255, 255, 0.75)",
                  }}
                >
                  60%
                </div>

                {/* Output 10% clean outlined pill */}
                <div className="border border-black/[0.18] bg-transparent text-[#1a1a1a] text-[12px] font-medium px-4 py-1.5 rounded-full w-[62px] text-center">
                  10%
                </div>
              </div>
            </div>

            {/* Right side: 3 Big Metric Quick Stats */}
            <div className="flex items-center gap-8 sm:gap-10 lg:gap-12 pr-2">
              {/* 78 Employe */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="w-5.5 h-5.5 rounded-full border border-black/[0.12] bg-white/40 flex items-center justify-center text-black/70">
                    <Users size={11} strokeWidth={1.5} />
                  </div>
                  <span className="text-[38px] sm:text-[42px] font-light tracking-tighter text-[#1a1a1a] leading-none">
                    78
                  </span>
                </div>
                <span className="text-[11px] text-[#666c77] font-normal pl-7.5 -mt-1">
                  Employe
                </span>
              </div>

              {/* 56 Hirings */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="w-5.5 h-5.5 rounded-full border border-black/[0.12] bg-white/40 flex items-center justify-center text-black/70">
                    <UserPlus size={11} strokeWidth={1.5} />
                  </div>
                  <span className="text-[38px] sm:text-[42px] font-light tracking-tighter text-[#1a1a1a] leading-none">
                    56
                  </span>
                </div>
                <span className="text-[11px] text-[#666c77] font-normal pl-7.5 -mt-1">
                  Hirings
                </span>
              </div>

              {/* 203 Projects */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="w-5.5 h-5.5 rounded-full border border-black/[0.12] bg-white/40 flex items-center justify-center text-black/70">
                    <Laptop size={11} strokeWidth={1.5} />
                  </div>
                  <span className="text-[38px] sm:text-[42px] font-light tracking-tighter text-[#1a1a1a] leading-none">
                    203
                  </span>
                </div>
                <span className="text-[11px] text-[#666c77] font-normal pl-7.5 -mt-1">
                  Projects
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== MAIN DASHBOARD GRID ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-start mt-2">
          {/* ==================== COLUMN 1 (Left): Profile + Accordion ==================== */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Milton Profile Card */}
            <div className="rounded-[28px] overflow-hidden relative h-[218px] shadow-xs border border-white/80 bg-[#042f2e]">
              <img
                src="./assets/founder-avatar.png?v=2"
                alt="Milton"
                className="w-full h-full object-cover object-[center_12%]"
              />
              {/* Clean bottom gradient vignette */}
              <div
                className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(4, 47, 46, 0.95) 0%, rgba(4, 47, 46, 0.65) 45%, rgba(4, 47, 46, 0.25) 70%, transparent 100%)",
                }}
              />

              {/* Card Footer Content */}
              <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between z-10">
                <div>
                  <h3 className="text-white font-medium text-[15px] leading-tight drop-shadow-xs">
                    Milton
                  </h3>
                  <p className="text-white/80 text-[11px] font-normal mt-0.5">
                    Founder & Lead Engineer
                  </p>
                </div>
              </div>
            </div>

            {/* Management Accordion Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-[26px] p-5 shadow-xs border border-white/80 flex flex-col gap-3">
              {/* Item 1: Pension contributions */}
              <button
                onClick={() => toggleAccordion("pension")}
                className="w-full flex items-center justify-between text-left py-0.5 group cursor-pointer"
              >
                <span className="text-xs font-semibold text-neutral-800 group-hover:text-black">
                  Pension contributions
                </span>
                <ChevronDown
                  size={14}
                  strokeWidth={1.5}
                  className={`text-neutral-500 transition-transform ${
                    expandedSection === "pension" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Item 2: Devices (Expanded) */}
              <div className="flex flex-col">
                <button
                  onClick={() => toggleAccordion("devices")}
                  className="w-full flex items-center justify-between text-left py-0.5 group cursor-pointer"
                >
                  <span className="text-xs font-semibold text-neutral-800 group-hover:text-black">
                    Devices
                  </span>
                  <ChevronUp
                    size={14}
                    strokeWidth={1.5}
                    className={`text-neutral-500 transition-transform ${
                      expandedSection === "devices" ? "" : "rotate-180"
                    }`}
                  />
                </button>

                {expandedSection === "devices" && (
                  <div className="mt-2 flex items-center justify-between pl-0.5 pr-1 py-1">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-8 rounded flex items-center justify-center overflow-hidden">
                        <img
                          src="./assets/macbook.png"
                          alt="MacBook Air"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#1a1a1a] leading-tight">
                          MacBook Air
                        </p>
                        <p className="text-[10px] text-[#888e99] font-normal mt-0.5">
                          Version M1
                        </p>
                      </div>
                    </div>
                    <button className="text-neutral-400 hover:text-neutral-700 transition-colors p-1">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Item 3: Compensation Summary */}
              <button
                onClick={() => toggleAccordion("compensation")}
                className="w-full flex items-center justify-between text-left py-0.5 group cursor-pointer"
              >
                <span className="text-xs font-semibold text-neutral-800 group-hover:text-black">
                  Compensation Summary
                </span>
                <ChevronDown
                  size={14}
                  strokeWidth={1.5}
                  className={`text-neutral-500 transition-transform ${
                    expandedSection === "compensation" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Item 4: Employee Benefits */}
              <button
                onClick={() => toggleAccordion("benefits")}
                className="w-full flex items-center justify-between text-left py-0.5 group cursor-pointer"
              >
                <span className="text-xs font-semibold text-neutral-800 group-hover:text-black">
                  Employee Benefits
                </span>
                <ChevronDown
                  size={14}
                  strokeWidth={1.5}
                  className={`text-neutral-500 transition-transform ${
                    expandedSection === "benefits" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dotted border at bottom */}
              <div className="border-b border-dotted border-black/[0.12] w-full pt-1" />
            </div>
          </div>

          {/* ==================== MIDDLE AREA (Span 6): Progress + Time Tracker + Schedule ==================== */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Top Row: Progress + Time Tracker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Progress Card */}
              <div className="bg-white/85 rounded-[26px] p-5 shadow-xs border border-white/80 flex flex-col justify-between h-[218px]">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-neutral-800">
                    Progress
                  </span>
                  <button className="w-6 h-6 rounded-full border border-neutral-200/90 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer">
                    <ArrowUpRight size={12} strokeWidth={2} />
                  </button>
                </div>

                {/* Metric */}
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-light tracking-tight text-neutral-900">
                    6.1 h
                  </span>
                  <div className="text-[10px] leading-tight text-[#888e99] font-normal">
                    <p>Work Time</p>
                    <p>this week</p>
                  </div>
                </div>

                {/* Activity Bar Chart with faint dashed vertical guides */}
                <div className="grid grid-cols-7 gap-2 items-end pt-3 relative">
                  {/* Sunday */}
                  <div className="flex flex-col items-center gap-1.5 relative">
                    <div className="absolute inset-y-0 w-px border-l border-dashed border-black/[0.08] pointer-events-none -z-0" />
                    <div className="w-1.5 h-6 rounded-full bg-neutral-200 z-10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 z-10" />
                    <span className="text-[10px] text-neutral-400 font-normal">S</span>
                  </div>

                  {/* Monday */}
                  <div className="flex flex-col items-center gap-1.5 relative">
                    <div className="absolute inset-y-0 w-px border-l border-dashed border-black/[0.08] pointer-events-none -z-0" />
                    <div className="w-1.5 h-13 rounded-full bg-[#1c1e21] z-10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1c1e21] z-10" />
                    <span className="text-[10px] text-neutral-400 font-normal">M</span>
                  </div>

                  {/* Tuesday */}
                  <div className="flex flex-col items-center gap-1.5 relative">
                    <div className="absolute inset-y-0 w-px border-l border-dashed border-black/[0.08] pointer-events-none -z-0" />
                    <div className="w-1.5 h-9 rounded-full bg-[#1c1e21] z-10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1c1e21] z-10" />
                    <span className="text-[10px] text-neutral-400 font-normal">T</span>
                  </div>

                  {/* Wednesday */}
                  <div className="flex flex-col items-center gap-1.5 relative">
                    <div className="absolute inset-y-0 w-px border-l border-dashed border-black/[0.08] pointer-events-none -z-0" />
                    <div className="w-1.5 h-7 rounded-full bg-[#1c1e21] z-10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1c1e21] z-10" />
                    <span className="text-[10px] text-neutral-400 font-normal">W</span>
                  </div>

                  {/* Thursday */}
                  <div className="flex flex-col items-center gap-1.5 relative">
                    <div className="absolute inset-y-0 w-px border-l border-dashed border-black/[0.08] pointer-events-none -z-0" />
                    <div className="w-1.5 h-11 rounded-full bg-[#1c1e21] z-10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1c1e21] z-10" />
                    <span className="text-[10px] text-neutral-400 font-normal">T</span>
                  </div>

                  {/* Friday (Highlighted with Tooltip and brand green bar) */}
                  <div className="flex flex-col items-center gap-1.5 relative">
                    <div className="absolute inset-y-0 w-px border-l border-dashed border-black/[0.08] pointer-events-none -z-0" />
                    {/* Floating Tooltip Pill */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#c8ff00] text-[#0a0a0a] text-[9.5px] font-bold px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap z-20">
                      5h 23m
                    </div>
                    <div className="w-1.5 h-14 rounded-full bg-[#c8ff00] z-10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c8ff00] z-10" />
                    <span className="text-[10px] text-neutral-400 font-normal">F</span>
                  </div>

                  {/* Saturday */}
                  <div className="flex flex-col items-center gap-1.5 relative">
                    <div className="absolute inset-y-0 w-px border-l border-dashed border-black/[0.08] pointer-events-none -z-0" />
                    <div className="w-1.5 h-6 rounded-full bg-neutral-200 z-10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 z-10" />
                    <span className="text-[10px] text-neutral-400 font-normal">S</span>
                  </div>
                </div>
              </div>

              {/* Time Tracker Card */}
              <div className="bg-white/85 rounded-[26px] p-5 shadow-xs border border-white/80 flex flex-col justify-between h-[218px]">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-neutral-800">
                    Time tracker
                  </span>
                  <button className="w-6 h-6 rounded-full border border-neutral-200/90 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer">
                    <ArrowUpRight size={12} strokeWidth={2} />
                  </button>
                </div>

                {/* Thick Bold Golden Tachymeter Circular Dial */}
                <div className="flex items-center justify-center my-0.5 relative">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Radial Tick Marks along perimeter */}
                      {ticks.map((deg, i) => {
                        const rad = (deg * Math.PI) / 180;
                        const x1 = 50 + 44 * Math.cos(rad);
                        const y1 = 50 + 44 * Math.sin(rad);
                        const x2 = 50 + 39 * Math.cos(rad);
                        const y2 = 50 + 39 * Math.sin(rad);
                        return (
                          <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#cbd5e1"
                            strokeWidth="1.2"
                          />
                        );
                      })}

                      {/* Bold Brand Green Progress Arc sweeping to bottom right */}
                      <circle
                        cx="50"
                        cy="50"
                        r="37"
                        fill="none"
                        stroke="#c8ff00"
                        strokeWidth="8.5"
                        strokeDasharray="232.5"
                        strokeDashoffset={232.5 * (1 - 0.52)}
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Centered Readout */}
                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="text-[25px] font-light tracking-tight text-[#1a1a1a] leading-none">
                        {formatTime(seconds)}
                      </span>
                      <span className="text-[10px] text-[#717680] font-normal mt-1">
                        Work Time
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Controls */}
                <div className="flex items-center justify-between">
                  {/* Play / Pause pill */}
                  <div className="border border-black/[0.1] bg-white rounded-full px-3.5 py-1.5 flex items-center gap-3 shadow-xs">
                    <button
                      onClick={() => setTimerRunning(true)}
                      className={`cursor-pointer transition-colors ${
                        timerRunning ? "text-neutral-400" : "text-[#1c1e21]"
                      }`}
                    >
                      <Play
                        size={11}
                        fill={timerRunning ? "none" : "currentColor"}
                      />
                    </button>
                    <button
                      onClick={() => setTimerRunning(false)}
                      className={`cursor-pointer transition-colors ${
                        timerRunning ? "text-[#1c1e21]" : "text-neutral-400"
                      }`}
                    >
                      <Pause
                        size={11}
                        fill={timerRunning ? "currentColor" : "none"}
                      />
                    </button>
                  </div>

                  {/* Stopwatch icon button */}
                  <button className="w-8 h-8 rounded-full bg-[#1d1f22] text-white flex items-center justify-center shadow-xs hover:bg-black transition-colors cursor-pointer">
                    <Timer size={13} strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Row: Calendar & Schedule Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-[26px] p-5 shadow-xs border border-white/80 flex flex-col justify-between h-[230px]">
              {/* Header: Month selector */}
              <div className="flex items-center justify-between mb-2">
                <button className="border border-neutral-300/80 rounded-full px-3.5 py-1 text-[11px] font-medium text-neutral-700 bg-white/50 hover:bg-white/80 transition-colors shadow-xs cursor-pointer">
                  August
                </button>
                <span className="text-xs font-semibold text-neutral-800">
                  September 2024
                </span>
                <button className="border border-neutral-300/80 rounded-full px-3.5 py-1 text-[11px] font-medium text-neutral-700 bg-white/50 hover:bg-white/80 transition-colors shadow-xs cursor-pointer">
                  October
                </button>
              </div>

              {/* Schedule Matrix */}
              <div className="flex-1 relative flex flex-col justify-between pt-1">
                {/* Day Columns Header - Exactly 6 days Mon 22 - Sat 27 */}
                <div className="grid grid-cols-6 text-center pl-12 pr-2">
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Mon</span>
                    <span className="text-xs font-medium text-neutral-800">22</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Tue</span>
                    <span className="text-xs font-medium text-neutral-800">23</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Wed</span>
                    <span className="text-xs font-medium text-neutral-800">24</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Thu</span>
                    <span className="text-xs font-medium text-neutral-800">25</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Fri</span>
                    <span className="text-xs font-medium text-neutral-800">26</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Sat</span>
                    <span className="text-xs font-medium text-neutral-800">27</span>
                  </div>
                </div>

                {/* Grid Body with Time Labels & Dotted Lines */}
                <div className="relative flex-1 mt-1 flex flex-col justify-between py-1">
                  {/* Vertical Dotted Guides across 6 days */}
                  <div className="absolute inset-0 pl-12 pr-2 grid grid-cols-6 pointer-events-none">
                    <div className="border-r border-dotted border-neutral-300/60" />
                    <div className="border-r border-dotted border-neutral-300/60" />
                    <div className="border-r border-dotted border-neutral-300/60" />
                    <div className="border-r border-dotted border-neutral-300/60" />
                    <div className="border-r border-dotted border-neutral-300/60" />
                    <div />
                  </div>

                  {/* Time Labels */}
                  <div className="flex items-center text-[10px] text-neutral-400 h-6">
                    8:00 am
                  </div>
                  <div className="flex items-center text-[10px] text-neutral-400 h-6">
                    9:00 am
                  </div>
                  <div className="flex items-center text-[10px] text-neutral-400 h-6">
                    10:00 am
                  </div>
                  <div className="flex items-center text-[10px] text-neutral-400 h-6">
                    11:00 am
                  </div>

                  {/* Event 1: Weekly Team Sync (spanning Tue 23 - Wed 24) */}
                  <div className="absolute top-1 left-[25%] right-[42%] bg-[#1e2023] text-white rounded-2xl px-3.5 py-2 shadow-md border border-neutral-700/50 flex items-center justify-between gap-2.5 z-10">
                    <div>
                      <p className="text-[11px] font-semibold text-white leading-tight">
                        Weekly Team Sync
                      </p>
                      <p className="text-[9px] text-neutral-400 leading-tight mt-0.5">
                        Discuss progress on projects
                      </p>
                    </div>
                    {/* 3 Circular Avatar Stack */}
                    <div className="flex items-center -space-x-1.5 shrink-0">
                      <div className="w-5 h-5 rounded-full border border-[#1e2023] overflow-hidden bg-[#c8ff00]">
                        <img src="./assets/team_avatars.png" className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="w-5 h-5 rounded-full border border-[#1e2023] overflow-hidden bg-rose-300">
                        <img src="./assets/team_avatars.png" className="w-full h-full object-cover scale-125" alt="" />
                      </div>
                      <div className="w-5 h-5 rounded-full border border-[#1e2023] overflow-hidden bg-sky-300">
                        <img src="./assets/team_avatars.png" className="w-full h-full object-cover scale-150" alt="" />
                      </div>
                    </div>
                  </div>

                  {/* Event 2: Onboarding Session (spanning Thu 25 - Fri 26) */}
                  <div className="absolute top-[48%] left-[58%] right-[8%] bg-white text-neutral-900 rounded-2xl px-3.5 py-1.5 shadow-sm border border-neutral-200/90 flex items-center justify-between gap-2.5 z-10">
                    <div>
                      <p className="text-[11px] font-semibold text-neutral-900 leading-tight">
                        Onboarding Session
                      </p>
                      <p className="text-[9px] text-neutral-500 leading-tight mt-0.5">
                        Introduction for new hires
                      </p>
                    </div>
                    {/* 2 Circular Avatar Stack */}
                    <div className="flex items-center -space-x-1.5 shrink-0">
                      <div className="w-5 h-5 rounded-full border border-white overflow-hidden bg-teal-300">
                        <img src="./assets/onboarding_avatars.png" className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="w-5 h-5 rounded-full border border-white overflow-hidden bg-emerald-300">
                        <img src="./assets/onboarding_avatars.png" className="w-full h-full object-cover scale-125" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==================== COLUMN 4 (Right): Onboarding Top + Onboarding Task ==================== */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Onboarding Metric Card */}
            <div className="bg-white/80 rounded-[26px] p-5 shadow-xs border border-white/80 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold text-[#1a1a1a]">
                  Onboarding
                </span>
                <span className="text-[26px] font-light text-[#1a1a1a] tracking-tight">
                  18%
                </span>
              </div>

              <div className="mt-2.5">
                {/* Labels directly aligned above their segments */}
                <div className="flex items-center gap-1.5 text-[10px] font-normal text-[#666] mb-1.5">
                  <span className="flex-1 text-center">30%</span>
                  <span className="w-14 text-center">25%</span>
                  <span className="w-7 text-center">0%</span>
                </div>

                {/* Segmented Bar */}
                <div className="flex items-center gap-1.5">
                  {/* Brand Green Task segment */}
                  <div className="bg-[#c8ff00] rounded-xl h-7 px-3 flex-1 flex items-center justify-center shadow-xs">
                    <span className="text-[11px] font-semibold text-[#0a0a0a]">Task</span>
                  </div>

                  {/* Charcoal segment */}
                  <div className="bg-[#1d1f22] rounded-xl h-7 w-14 shadow-xs" />

                  {/* Gray segment */}
                  <div className="bg-[#d2d5dc] border border-black/[0.08] rounded-xl h-7 w-7" />
                </div>
              </div>
            </div>

            {/* Onboarding Task Dark Stack Card */}
            <div className="relative pt-2.5">
              {/* Stacked curved tab under-layer peeking out behind the dark card */}
              <div className="absolute top-0 inset-x-5 h-5 bg-[#42464e] rounded-t-[20px] -z-0 opacity-90" />

              {/* Main Dark Card */}
              <div className="relative z-10 bg-[#222428] text-white rounded-[28px] p-5 shadow-xl border border-white/5 flex flex-col gap-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-white">
                    Onboarding Task
                  </span>
                  <span className="text-[22px] font-light text-neutral-200 tracking-tight">
                    {completedCount}/8
                  </span>
                </div>

                {/* Tasks List */}
                <div className="flex flex-col gap-2.5">
                  {tasks.map((task) => {
                    const IconComponent = task.icon;
                    return (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className="flex items-center justify-between py-1 px-1 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-neutral-300 group-hover:text-white transition-colors shrink-0">
                            <IconComponent size={14} strokeWidth={1.5} />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-white leading-tight">
                              {task.title}
                            </p>
                            <p className="text-[10px] text-neutral-400 leading-tight mt-0.5">
                              {task.time}
                            </p>
                          </div>
                        </div>

                        {/* Status Checkbox / Indicator */}
                        <div>
                          {task.completed ? (
                            <div className="w-4.5 h-4.5 rounded-full bg-[#c8ff00] flex items-center justify-center shadow-xs">
                              <Check
                                size={10}
                                strokeWidth={3}
                                className="text-[#0a0a0a]"
                              />
                            </div>
                          ) : (
                            <div className="w-4.5 h-4.5 rounded-full border border-[#383d46] bg-transparent group-hover:border-neutral-400 transition-colors" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
