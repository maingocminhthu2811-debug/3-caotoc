/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

function formatNumberVN(val: number, decimals: number = 0): string {
  if (decimals > 0) {
    const fixed = val.toFixed(decimals);
    const parts = fixed.split('.');
    const whole = parseInt(parts[0], 10).toLocaleString('vi-VN');
    return whole + ',' + parts[1];
  }
  return Math.round(val).toLocaleString('vi-VN');
}

function Counter({ end, decimals = 0 }: { end: number; decimals?: number }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1800;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setVal(easeOut * end);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [end]);

  return <>{formatNumberVN(val, decimals)}</>;
}

export default function App() {
  return (
    <div className="bg-[#f8f9ff] font-body text-[16px] leading-[25px] text-[#0b1c30] antialiased">
      <header className="fixed top-0 left-0 w-full z-50 bg-[#f8f9ff]/90 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-sm"></header>

      <main className="w-full pt-20 bg-[#f8f9ff] min-h-[calc(100vh-5rem)]">
        <div className="flex flex-col w-full">
          {/* HERO SECTION WITH SATELLITE / TERRAIN HIGHWAY OVERLAY */}
          <section className="relative w-full -mt-20 overflow-hidden bg-[#001026] min-h-[580px] flex items-center">
            <div className="absolute inset-0 z-0">
              <img
                alt="Vietnam highway infrastructure"
                className="w-full h-full object-cover object-center"
                src="https://lh3.googleusercontent.com/aida/ALJJyrD83p6SvpudQfRhSorRG3BLdpMAen-71-q_vvIbqHEPMemP8i_bAR-0pZVoXE5nUWR7ei9TmDFwYzyVgjl8aHl-bTnU-Hd29dKBq147kqiGmkYHd0ZnARG511p3_I9qpALPgsKXi7lQXxv8XPwPIaCdq7yD2MiswvAkVt3_wNQ3ovXxVpjP5bFAtfce6tX3SZjWEA3vFKMdIWvO2HBWNyN1FQ9KY-b0NGUke5ciBEAu1g"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(6, 19, 37, 0.82) 0%, rgba(11, 37, 69, 0.45) 50%, rgba(6, 19, 37, 0.85) 100%)' }}></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(253,101,30,0.12),transparent_70%)]"></div>
            </div>
            <div className="relative z-10 w-full px-6 pt-28 pb-10 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
              <h1 className="font-headline text-5xl md:text-6xl lg:text-[64px] text-white max-w-5xl tracking-tight leading-[1.3] uppercase font-black drop-shadow-md text-center">
                <span className="block mb-2">Dự kiến quy mô và</span>
                <span className="block">tổng vốn đầu tư</span>
                <span className="text-[#fd651e] mt-2 inline-block">3 DỰ ÁN CAO TỐC MỚI</span>
              </h1>
            </div>
          </section>

          {/* MAIN EDITORIAL CONTENT WRAPPER */}
          <div className="w-full px-6 py-10 max-w-7xl mx-auto flex flex-col gap-10">
            {/* PHẦN 1: BỨC TRANH TỔNG QUAN */}
            <section className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-1">
                <div>
                  <div className="flex items-center gap-2 text-[#a73a00] font-mono-stat text-[14px] font-bold uppercase tracking-widest">
                    <span className="w-7 h-1 bg-[#fd651e] inline-block"></span>
                  </div>
                  <h2 className="font-headline text-[32px] leading-tight text-[#001026] tracking-tight font-extrabold mt-1">
                    Tổng quy mô 3 dự án
                  </h2>
                </div>
              </div>

              {/* Grid 2 Cột Lớn: Số liệu tổng quan & Donut Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Khối 2 thẻ số liệu khổng lồ (Column span 7) */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Big Stat 1: Chiều dài */}
                  <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-[#0b2545]"></div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono-stat text-[13px] text-[#44474e] font-bold uppercase tracking-wider">Tổng chiều dài</span>
                        <span className="w-11 h-11 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#0b2545]">
                          <span className="material-symbols-outlined text-[26px]">alt_route</span>
                        </span>
                      </div>
                      <div className="mt-4">
                        <div className="font-mono-stat text-[56px] text-[#0b2545] font-black tracking-tight leading-none">
                          <Counter end={430.5} decimals={1} /> <span className="font-headline text-[25px] text-[#0b1c30] font-semibold tracking-normal">km</span>
                        </div>
                        <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded bg-[#dce9ff] text-[#001026] font-mono-stat text-[13px] font-semibold">
                          <span className="material-symbols-outlined text-[17px] text-[#a73a00]">speed</span>
                          <span>Quy mô: <br /><strong>4 làn xe</strong></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#74777f]"></span>
                          <span>Tốc độ: <br /><strong>80 – 100 km/h</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Big Stat 2: Tổng vốn */}
                  <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-[#fd651e]"></div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono-stat text-[13px] text-[#44474e] font-bold uppercase tracking-wider">Tổng mức vốn</span>
                        <span className="w-11 h-11 rounded-lg bg-[#ffdbce] flex items-center justify-center text-[#a73a00]">
                          <span className="material-symbols-outlined text-[26px]">payments</span>
                        </span>
                      </div>
                      <div className="mt-4">
                        <div className="font-mono-stat text-[56px] text-[#fd651e] font-black tracking-tight leading-none">
                          <Counter end={162393} decimals={0} />
                        </div>
                        <div className="font-headline text-[22px] text-[#a73a00] font-bold tracking-tight mt-1.5">
                          Tỷ đồng
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Khối Đồ thị Doughnut tỷ trọng nguồn vốn (Column span 5) */}
                <div className="lg:col-span-5 bg-white rounded-xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <div></div>
                    <span className="material-symbols-outlined text-[#74777f] text-[22px]">pie_chart</span>
                  </div>
                  <div className="flex flex-col gap-4 my-auto w-full">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between font-mono-stat text-[13px]">
                        <span className="flex items-center gap-2 font-bold text-[#001026]">
                          <span className="w-3 h-3 rounded-sm bg-[#0b2545] inline-block"></span>Ngân sách Trung ương
                        </span>
                      </div>
                      <div className="w-full h-4 rounded-full bg-[#e5eeff] overflow-hidden p-0.5">
                        <div className="bg-[#0b2545] h-full rounded-full transition-all duration-700" style={{ width: '97.5%' }}></div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pt-0.5">
                        <span className="font-headline text-[21px] text-[#001026] font-bold"><Counter end={158342} /> <span className="font-body text-[13px] font-normal text-[#44474e]">tỷ đồng</span></span>
                        <span className="text-[13px] font-medium text-[#44474e] flex items-center gap-1">Giai đoạn 2026 - 2030 dự kiến bố trí khoảng <strong className="text-[#001026] font-bold"><Counter end={119398} /> tỷ đồng</strong></span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 pt-2.5 border-t border-[#dce9ff]">
                      <div className="flex items-center justify-between font-mono-stat text-[13px]">
                        <span className="flex items-center gap-2 font-bold text-[#a73a00]">
                          <span className="w-3 h-3 rounded-sm bg-[#fd651e] inline-block"></span>Ngân sách Địa phương
                        </span>
                      </div>
                      <div className="w-full h-4 rounded-full bg-[#e5eeff] overflow-hidden p-0.5">
                        <div className="bg-[#fd651e] h-full rounded-full transition-all duration-700" style={{ width: '6%' }}></div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pt-0.5">
                        <span className="font-headline text-[21px] text-[#a73a00] font-bold"><Counter end={4051} /> <span className="font-body text-[13px] font-normal text-[#44474e]">tỷ đồng</span></span>
                        <div className="text-[13px] font-medium text-[#44474e] flex items-start gap-1 max-w-[280px] leading-snug sm:text-right sm:justify-end">
                          <span>Bố trí khoảng 50% chi phí bồi thường, hỗ trợ, tái định cư cho 02 địa phương làm cơ quan chủ quản</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PHẦN 2: CHI TIẾT 3 DỰ ÁN CAO TỐC */}
            <section className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-1">
                <div>
                  <div className="flex items-center gap-2 text-[#a73a00] font-mono-stat text-[14px] font-bold uppercase tracking-widest">
                    <span className="w-7 h-1 bg-[#fd651e] inline-block"></span>
                  </div>
                  <h2 className="font-headline text-[32px] leading-tight text-[#001026] tracking-tight font-extrabold mt-1">
                    Chi tiết vốn đầu tư từng dự án
                  </h2>
                </div>
                <div className="flex items-center gap-2"></div>
              </div>

              {/* 3-Column Card Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {/* CARD 1: QUẢNG NGÃI - KON TUM */}
                <div className="group relative rounded-xl shadow-md flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] hover:border-[#fd651e]/80 transition-all duration-300 min-h-[500px] border border-white/20 cursor-pointer">
                  <div className="absolute inset-0 z-0">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAckoAMqWBaZBOoyjNBjXNlsDk7wSZIWAp4qX3i0w1VgjqzHFTz-y5vRKODdxDDnX-9n2fbySOqJiIlO4OT7V0_aNFQr6ilPm6kUi-7g0nibQVRiES_ALqxpk6AwU8RRdIyUKKeXNdqFcWyuV7AxmJ4916L2k77dIYT6q2lJn6kBicT2Bk6LMJBhcK9VC_WbI3-j9zY_FlyWFZMZPxjZ7wOiLBnxuftLTySkpy77vYVfYXol5pH15u3fw" alt="Cao tốc Quảng Ngãi - Kon Tum" className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001026] via-[#001026]/80 to-[#001026]/40 backdrop-blur-[2px] group-hover:via-[#001026]/70 transition-colors"></div>
                  </div>
                  <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-3 py-1 rounded bg-[#fd651e]/90 text-white font-mono-stat text-[13px] font-bold uppercase tracking-wider shadow-sm group-hover:bg-[#fd651e] group-hover:shadow-md transition-all">Dự án 01</span>
                        <span className="material-symbols-outlined text-white/90 text-[26px] group-hover:scale-110 transition-transform">landscape</span>
                      </div>
                      <h3 className="font-headline text-[25px] text-white font-bold mt-2 leading-tight drop-shadow-md group-hover:text-[#ffb599] transition-colors">CAO TỐC QUẢNG NGÃI – KON TUM</h3>
                      <div className="mt-6 p-3 rounded-lg bg-white/10 border border-white/20 flex items-center justify-between shadow-sm backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 rounded bg-white/20 flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-[20px]">straighten</span>
                          </span>
                          <div>
                            <span className="font-mono-stat text-[13px] text-white/80 block uppercase font-semibold">Chiều dài tuyến</span>
                            <span className="font-headline text-[21px] text-white font-extrabold drop-shadow-sm">Khoảng <Counter end={132} /> km</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 rounded-xl transition-all duration-300 group-hover:bg-white/10 group-hover:border group-hover:border-[#fd651e]/40 backdrop-blur-sm">
                        <span className="font-mono-stat text-[13px] text-white/80 uppercase tracking-wider block font-semibold">Sơ bộ tổng mức đầu tư</span>
                        <div className="font-headline text-[44px] text-[#ffb599] font-black leading-tight mt-0.5 drop-shadow group-hover:scale-105 group-hover:text-[#ffe2b5] origin-left transition-all duration-300">
                          <Counter end={48283} /> <span className="font-headline text-[22px] text-white font-bold">tỷ đồng</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-3 pt-2">
                      <div className="w-full h-3.5 rounded-full bg-white/20 flex overflow-hidden p-0.5">
                        <div className="bg-[#b1c7f0] h-full rounded-full" style={{ width: '95.8%' }} title="Trung ương: 46.236 tỷ"></div>
                        <div className="bg-[#fd651e] h-full rounded-full" style={{ width: '4.2%' }} title="Địa phương: 2.047 tỷ"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm pt-1">
                        <div className="p-2.5 rounded bg-white/15 border border-white/15 backdrop-blur-sm group-hover:bg-white/25 transition-colors">
                          <span className="text-[13px] font-bold text-white/90 block uppercase">Trung ương</span>
                          <span className="font-mono-stat text-[16px] font-bold text-white"><Counter end={46236} /> tỷ</span>
                        </div>
                        <div className="p-2.5 rounded bg-[#fd651e]/40 border border-[#fd651e]/40 backdrop-blur-sm group-hover:bg-[#fd651e]/60 transition-colors">
                          <span className="text-[13px] font-bold text-[#ffdbce] block uppercase">Địa phương</span>
                          <span className="font-mono-stat text-[16px] font-bold text-[#ffdbce]"><Counter end={2047} /> tỷ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD 2: BẢO HÀ - LAI CHÂU */}
                <div className="group relative rounded-xl shadow-md flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] hover:border-[#fd651e]/80 transition-all duration-300 min-h-[500px] border border-white/20 cursor-pointer">
                  <div className="absolute inset-0 z-0">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGke16_2FBC1Ufzj1RB7eLL6XBOPGRSweoNrb66sGVzD07bRz3ZBsf5M2dgS8uXHGbEOxJbbV2dSESO18bBC8djPOAENDpbEtsax4PWcy9Ywkf-proB1BtSJFILlu5Nv2p74ymCglwU8DADI6l3MMqNtMvlfuGzDm_AiiJvNdRyK9rOPzJrGjQ5eI_yStRLwNndooiNSrjrImSxpnrOz4Pl_v4J8KUVM9aJ_yHYVyLB5qKfKFS4HclDw" alt="Cao tốc Bảo Hà - Lai Châu" className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001026] via-[#001026]/80 to-[#001026]/40 backdrop-blur-[2px] group-hover:via-[#001026]/70 transition-colors"></div>
                  </div>
                  <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-3 py-1 rounded bg-[#fd651e]/90 text-white font-mono-stat text-[13px] font-bold uppercase tracking-wider shadow-sm group-hover:bg-[#fd651e] group-hover:shadow-md transition-all">Dự án 02</span>
                        <span className="material-symbols-outlined text-white/90 text-[26px] group-hover:scale-110 transition-transform">terrain</span>
                      </div>
                      <h3 className="font-headline text-[25px] text-white font-bold mt-2 leading-tight drop-shadow-md group-hover:text-[#ffb599] transition-colors">CAO TỐC BẢO HÀ – LAI CHÂU</h3>
                      <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/15 border border-white/20 text-white font-mono-stat text-[13px] font-semibold backdrop-blur-sm">
                        <span className="material-symbols-outlined text-[17px] text-[#ffb599]">explore</span>Đoạn Bảo Hà - Tân Phong
                      </div>
                      <div className="mt-6 p-3 rounded-lg bg-white/10 border border-white/20 flex items-center justify-between shadow-sm backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 rounded bg-white/20 flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-[20px]">straighten</span>
                          </span>
                          <div>
                            <span className="font-mono-stat text-[13px] text-white/80 block uppercase font-semibold">Chiều dài tuyến</span>
                            <span className="font-headline text-[21px] text-white font-extrabold drop-shadow-sm">Khoảng <Counter end={119} /> km</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 rounded-xl transition-all duration-300 group-hover:bg-white/10 group-hover:border group-hover:border-[#fd651e]/40 backdrop-blur-sm">
                        <span className="font-mono-stat text-[13px] text-white/80 uppercase tracking-wider block font-semibold">Sơ bộ tổng mức đầu tư</span>
                        <div className="font-headline text-[44px] text-[#ffb599] font-black leading-tight mt-0.5 drop-shadow group-hover:scale-105 group-hover:text-[#ffe2b5] origin-left transition-all duration-300">
                          <Counter end={50990} /> <span className="font-headline text-[21px] text-white font-bold">tỷ đồng</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-3 pt-2">
                      <div className="w-full h-3.5 rounded-full bg-white/20 flex overflow-hidden p-0.5">
                        <div className="bg-[#b1c7f0] h-full rounded-full" style={{ width: '96.1%' }} title="Trung ương: 48.986 tỷ"></div>
                        <div className="bg-[#fd651e] h-full rounded-full" style={{ width: '3.9%' }} title="Địa phương: 2.004 tỷ"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm pt-1">
                        <div className="p-2.5 rounded bg-white/15 border border-white/15 backdrop-blur-sm group-hover:bg-white/25 transition-colors">
                          <span className="text-[13px] font-bold text-white/90 block uppercase">Trung ương</span>
                          <span className="font-mono-stat text-[16px] font-bold text-white"><Counter end={48986} /> tỷ</span>
                        </div>
                        <div className="p-2.5 rounded bg-[#fd651e]/40 border border-[#fd651e]/40 backdrop-blur-sm group-hover:bg-[#fd651e]/60 transition-colors">
                          <span className="text-[13px] font-bold text-[#ffdbce] block uppercase">Địa phương</span>
                          <span className="font-mono-stat text-[16px] font-bold text-[#ffdbce]"><Counter end={2004} /> tỷ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD 3: MỘC CHÂU - SƠN LA - ĐIỆN BIÊN */}
                <div className="group relative rounded-xl shadow-md flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] hover:border-[#fd651e]/80 transition-all duration-300 min-h-[500px] border border-white/20 cursor-pointer">
                  <div className="absolute inset-0 z-0">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfyF5rs3ZbWBYCEOhR1viQfmaxhhAFVlPMn2omzHDsZ9U85W015ZmydEkYyvLJTRD4hjVYh0MuLP7dqoQlt0KRWtBOgenpf8J41Qhiem803ajl4TU83xnXp7oZpVQ6tYn9Q9OgfdWxqMZ2AQSeU8WSacaKAiUpelpwpESun4XEA1IIaHdiCnyB_OumH5NjK6H7j7sckfZf9YxvSUftCo5XwBpPaYwV56EGQpeMBb4yQXQl_euj5vlC5Q" alt="Mộc Châu – Sơn La – Điện Biên" className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001026] via-[#001026]/80 to-[#001026]/40 backdrop-blur-[2px] group-hover:via-[#001026]/70 transition-colors"></div>
                  </div>
                  <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-3 py-1 rounded bg-[#fd651e]/90 text-white font-mono-stat text-[13px] font-bold uppercase tracking-wider shadow-sm group-hover:bg-[#fd651e] group-hover:shadow-md transition-all">Dự án 03</span>
                        <span className="material-symbols-outlined text-white/90 text-[26px] group-hover:scale-110 transition-transform">flag</span>
                      </div>
                      <h3 className="font-headline text-[25px] text-white font-bold mt-2 leading-tight drop-shadow-md group-hover:text-[#ffb599] transition-colors">MỘC CHÂU – SƠN LA – ĐIỆN BIÊN</h3>
                      <div className="mt-6 p-3 rounded-lg bg-white/10 border border-white/20 flex items-center justify-between shadow-sm backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 rounded bg-white/20 flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-[20px]">straighten</span>
                          </span>
                          <div>
                            <span className="font-mono-stat text-[13px] text-white/80 block uppercase font-semibold">Chiều dài tuyến</span>
                            <span className="font-headline text-[21px] text-white font-extrabold drop-shadow-sm">Khoảng <Counter end={179.5} decimals={1} /> km</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 rounded-xl transition-all duration-300 group-hover:bg-white/10 group-hover:border group-hover:border-[#fd651e]/40 backdrop-blur-sm">
                        <span className="font-mono-stat text-[13px] text-white/80 uppercase tracking-wider block font-semibold">Sơ bộ tổng mức đầu tư</span>
                        <div className="font-headline text-[44px] text-[#ffb599] font-black leading-tight mt-0.5 drop-shadow group-hover:scale-105 group-hover:text-[#ffe2b5] origin-left transition-all duration-300">
                          <Counter end={63120} /> <span className="font-headline text-[21px] text-white font-bold">tỷ đồng</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-3 pt-2">
                      <div className="w-full h-3.5 rounded-full bg-white/20 flex overflow-hidden p-0.5">
                        <div className="bg-[#b1c7f0] h-full rounded-full" style={{ width: '100%' }} title="Trung ương: 100%"></div>
                      </div>
                      <div className="grid grid-cols-1 gap-2 text-sm pt-1">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PHẦN 3: LỘ TRÌNH TIẾN ĐỘ THỰC HIỆN DỰ ÁN (TIMELINE) */}
            <section className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-1">
                <div>
                  <div className="flex items-center gap-2 text-[#a73a00] font-mono-stat text-[14px] font-bold uppercase tracking-widest">
                    <span className="w-7 h-1 bg-[#fd651e] inline-block"></span>
                  </div>
                  <h2 className="font-headline text-[32px] leading-tight text-[#001026] tracking-tight font-extrabold mt-1">
                    Thời gian thực hiện và Tiến độ dự kiến
                  </h2>
                </div>
              </div>

              {/* Horizontal Timeline Container */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                  {/* Connecting Line behind milestones (desktop only) */}
                  <div className="hidden md:block absolute top-7 left-12 right-12 h-1 bg-[#e5eeff] z-0"></div>

                  {/* MỐC 1: 2026 - 2027 */}
                  <div className="relative z-10 flex flex-col gap-2 group">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-xl bg-[#0b2545] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
                        <span className="material-symbols-outlined text-[30px]">architecture</span>
                      </div>
                      <div className="md:hidden flex-1">
                        <div className="font-headline text-[21px] text-[#001026] font-bold">2026 – 2027</div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="font-headline text-[21px] text-[#001026] font-bold">2026 – 2027</div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#eff4ff] flex flex-col gap-2 flex-1">
                      <span className="font-mono-stat text-[15px] font-bold text-[#a73a00] uppercase">Chuẩn bị đầu tư</span>
                      <p className="font-body text-[14px] text-[#44474e] leading-relaxed">
                        Thực hiện trong các năm 2026 - 2027
                      </p>
                    </div>
                  </div>

                  {/* MỐC 2: CUỐI 2027 */}
                  <div className="relative z-10 flex flex-col gap-2 group">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-xl bg-[#fd651e] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
                        <span className="material-symbols-outlined text-[30px]">engineering</span>
                      </div>
                      <div className="md:hidden flex-1">
                        <div className="font-headline text-[21px] text-[#001026] font-bold">Cuối 2027</div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="font-headline text-[21px] text-[#001026] font-bold">Cuối 2027</div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#eff4ff] flex flex-col gap-2 flex-1">
                      <span className="font-mono-stat text-[15px] font-bold text-[#a73a00] uppercase">Giải phóng mặt bằng và khởi công</span>
                      <p className="font-body text-[14px] text-[#44474e] leading-relaxed">
                        Bắt đầu công tác bồi thường, hỗ trợ, tái định cư và phấn đấu khởi công xây dựng vào cuối năm 2027
                      </p>
                    </div>
                  </div>

                  {/* MỐC 3: NĂM 2030 */}
                  <div className="relative z-10 flex flex-col gap-2 group">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-xl bg-[#0b2545] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
                        <span className="material-symbols-outlined text-[30px]">traffic</span>
                      </div>
                      <div className="md:hidden flex-1">
                        <div className="font-headline text-[21px] text-[#001026] font-bold">Năm 2030</div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="font-headline text-[21px] text-[#001026] font-bold">Năm 2030</div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#eff4ff] flex flex-col gap-2 flex-1">
                      <span className="font-mono-stat text-[15px] font-bold text-[#a73a00] uppercase">Hoàn thành</span>
                      <p className="font-body text-[14px] text-[#44474e] leading-relaxed">
                        Phấn đấu cơ bản hoàn thành dự án năm 2030
                      </p>
                    </div>
                  </div>

                  {/* MỐC 4: NĂM 2031 */}
                  <div className="relative z-10 flex flex-col gap-2 group">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-xl bg-[#fd651e] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
                        <span className="material-symbols-outlined text-[30px]">verified</span>
                      </div>
                      <div className="md:hidden flex-1">
                        <div className="font-headline text-[21px] text-[#001026] font-bold">Năm 2031</div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="font-headline text-[21px] text-[#001026] font-bold">Năm 2031</div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#eff4ff] flex flex-col gap-2 flex-1">
                      <span className="font-mono-stat text-[15px] font-bold text-[#a73a00] uppercase">đưa vào khai thác</span>
                      <p className="font-body text-[14px] text-[#44474e] leading-relaxed">
                        Chính thức hoàn thành, đưa vào khai thác sử dụng từ năm 2031
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="w-full bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)]"></footer>
    </div>
  );
}
