"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchBlockList,
  fetchLatestBlock,
  fetchBlockStatistics,
  // fetchTxStatistics,
  fetchBlockInfo,
  BlockData,
  BlockStatistics,
  TxStatistics,
} from "@/utils/api";
import { useTranslations } from "next-intl";
import Decimal from "decimal.js";

const LoadingSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Title Skeleton */}
      <div className="flex justify-center">
        <Skeleton className="h-12 w-[300px]" />
      </div>

      <BlockVisualizationSkeleton />
      <ProgressBarSkeleton />
    </div>
  );
};

const BlockVisualizationSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative animate-pulse">
      {/* Mempool Card */}
      <div className="relative">
        <Skeleton className="h-6 w-24 mx-auto mb-2" />
        <div className="bg-[#28211b] backdrop-blur-[40px] rounded-lg p-4 border border-white/10">
          <div className="space-y-4">
            <Skeleton className="h-8 w-32 mx-auto" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-24 mx-auto" />
              <Skeleton className="h-6 w-24 mx-auto" />
            </div>
            <Skeleton className="h-4 w-36 mx-auto" />
          </div>
        </div>
        {/* Vertical Divider Line */}
        <div className="hidden md:block absolute right-[-16px] top-0 bottom-0 border-r border-dashed border-white/30" />
      </div>

      {/* Block Cards */}
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <div key={index}>
            <Skeleton className="h-6 w-24 mx-auto mb-2" />
            <div className="bg-[#28211b] backdrop-blur-[40px] rounded-lg p-4 border border-white/10">
              <div className="space-y-4">
                <Skeleton className="h-8 w-32 mx-auto" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-24 mx-auto" />
                  <Skeleton className="h-6 w-24 mx-auto" />
                </div>
                <Skeleton className="h-4 w-36 mx-auto" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

const ProgressBarSkeleton = () => {
  return (
    <div className="mt-12 bg-[#28211b] backdrop-blur-[40px] rounded-2xl p-4 md:p-8 border border-[#F39800]/50">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
        {/* Left Column */}
        <div className="w-full lg:w-auto lg:flex-1 space-y-6">
          {/* BTC Section */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <Skeleton className="h-[80px] w-[140px] rounded-lg" />
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-3">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Skeleton key={i} className="aspect-square rounded-lg" />
                  ))}
              </div>
            </div>
          </div>

          {/* MVC Section */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <Skeleton className="h-[80px] w-[140px] rounded-lg" />
            <div className="flex-1">
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-3">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Skeleton key={i} className="aspect-square rounded-lg" />
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:flex-shrink-0 bg-[#28211b] backdrop-blur-[40px] rounded-lg border border-white/10 p-6 lg:p-[50px] md:min-w-[450px] space-y-6">
          <Skeleton className="h-8 w-48 mx-auto" />
          <div className="flex justify-between items-center mb-5">
            <Skeleton className="h-8 w-32 rounded-full" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
          <Skeleton className="aspect-square w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

interface ProgressBarSectionProps {
  loading: boolean;
  selectedBlock: string;
  blocks: BlockData[];
  statistics: BlockStatistics[];
  btcStep: number;
  currentBlocks: number;
  formatTimeDisplay: (timestamp: number) => string;
  t: (key: string) => string;
}

const ProgressBarSection: React.FC<ProgressBarSectionProps> = ({
  loading,
  selectedBlock,
  blocks,
  statistics,
  btcStep,
  currentBlocks,
  formatTimeDisplay,
  t,
}) => {
  if (loading) {
    return <ProgressBarSkeleton />;
  }

  return (
    <div
      className={`mt-12 bg-[#28211b] backdrop-blur-[40px] rounded-2xl p-4 md:p-8 border border-[#F39800]/50 relative
        before:content-[''] before:absolute before:border-[16px] before:border-transparent before:border-b-[#F39800]/50 before:-mt-[1px]
        before:transition-all before:duration-300 before:bottom-full before:-translate-x-1/2 before:hidden md:before:block
        after:content-[''] after:absolute after:border-[14px] after:border-transparent after:border-b-[#28211b]
        after:transition-all after:duration-300 after:bottom-full after:-translate-x-1/2 after:hidden md:after:block
        animate-in fade-in duration-300
        ${
          selectedBlock === "mempool"
            ? "before:left-[10%] after:left-[10%]"
            : selectedBlock === blocks[3]?.header
            ? "before:left-[91%] after:left-[91%]"
            : selectedBlock === blocks[2]?.header
            ? "before:left-[70%] after:left-[70%]"
            : selectedBlock === blocks[1]?.header
            ? "before:left-[50%] after:left-[50%]"
            : selectedBlock === blocks[0]?.header
            ? "before:left-[30%] after:left-[30%]"
            : "before:opacity-0 after:opacity-0"
        }`}
    >
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
        {/* Left Column */}
        <div className="w-full lg:w-auto lg:flex-1">
          {/* BTC Section */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start lg:items-center">
            {/* BTC Label */}
            <div className="relative h-[60px] lg:h-[80px] w-[120px] lg:w-[140px] bg-[#28211b] border border-[#FFA317] rounded-lg p-3 lg:p-4 flex items-center before:hidden lg:before:block after:hidden lg:after:block before:content-[''] before:absolute before:left-full before:top-1/2 before:border-[11px] before:border-transparent before:border-l-[#FFA317] before:-mt-[11px] after:content-[''] after:absolute after:left-full after:top-1/2 after:border-[9px] after:border-transparent after:border-l-[#28211b] after:-mt-[9px] after:pointer-events-none">
              <div className="flex items-center justify-center gap-2 lg:gap-2.5 w-full">
                <Image
                  src="/network/btc.png"
                  alt="BTC"
                  width={20}
                  height={20}
                  className="w-5 h-5 lg:w-[22px] lg:h-[22px]"
                />
                <span className="text-white text-xl lg:text-[26px]">BTC</span>
              </div>
            </div>

            {/* BTC Content */}
            <div className="flex-1 w-full lg:w-auto bg-[#28211b] backdrop-blur-[40px] rounded-lg border border-white/10">
              {/* Progress Bar */}
              <div className="px-4 lg:px-[18px] py-3 space-y-4 lg:space-y-[18px]">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white text-base lg:text-lg">
                    {t("blockProgressBar")}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-[#FA9600] text-sm lg:text-base">
                      {currentBlocks}
                      {t("blocks")}
                    </div>
                    <div className="text-white/50 text-sm lg:text-base">
                      / {btcStep}
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-[#3D3935] rounded-full">
                  <div
                    className="h-full bg-[#FA9600] rounded-full"
                    style={{
                      width: `${
                        (statistics.filter(
                          (stat) => stat.chainName === "Bitcoin"
                        ).length /
                          Math.max(btcStep, currentBlocks)) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* BTC Blocks */}
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-3 p-4 lg:px-[18px] lg:pb-3">
                {statistics
                  .filter((stat) => stat.chainName === "Bitcoin")
                  .sort((a, b) => a.blockHeight - b.blockHeight)
                  .reduce((acc, block, index, array) => {
                    if (index < 4) {
                      acc.push(block);
                    } else if (index === array.length - 1 && array.length > 4) {
                      acc.push({ type: "ellipsis" } as const);
                      acc.push(block);
                    }
                    return acc;
                  }, [] as (BlockStatistics | { type: "ellipsis" })[])
                  .map((item) => {
                    if ("type" in item && item.type === "ellipsis") {
                      return (
                        <div
                          key="ellipsis"
                          className="text-white/50 self-center text-lg tracking-widest text-center"
                        >
                          ......
                        </div>
                      );
                    }

                    const block = item as BlockStatistics;
                    return (
                      <div
                        key={block.blockHash}
                        className="bg-[#FA9600] rounded-lg text-center p-3 flex flex-col items-center justify-center gap-2 aspect-square shrink-0"
                      >
                        <div className="text-[#6C655E] text-xs">
                          # {block.blockHeight}
                        </div>
                        <div className="text-[#3D3935] font-semibold text-sm">
                          {block.txCount} TX
                        </div>
                        <div className="text-[#6C655E] text-xs">
                          {formatTimeDisplay(block.blockTime)}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* MVC Section */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start lg:items-center mt-6">
            {/* MVC Label */}
            <div className="relative h-[60px] lg:h-[80px] w-[120px] lg:w-[140px] bg-[#28211b] border border-[#8385F7]/70 rounded-lg p-3 lg:p-4 flex items-center before:hidden lg:before:block after:hidden lg:after:block before:content-[''] before:absolute before:left-full before:top-1/2 before:border-[11px] before:border-transparent before:border-l-[#8385F7]/70 before:-mt-[11px] after:content-[''] after:absolute after:left-full after:top-1/2 after:border-[9px] after:border-transparent after:border-l-[#28211b] after:-mt-[9px] after:pointer-events-none">
              <div className="flex items-center justify-center gap-2 lg:gap-2.5 w-full">
                <Image
                  src="/network/mvc.png"
                  alt="MVC"
                  width={20}
                  height={20}
                  className="w-5 h-5 lg:w-[22px] lg:h-[22px]"
                />
                <span className="text-white text-xl lg:text-[26px]">MVC</span>
              </div>
            </div>

            {/* MVC Content */}
            <div className="flex-1 w-full lg:w-auto bg-[#28211b] backdrop-blur-[40px] rounded-lg border border-white/10 min-h-[120px]">
              {/* MVC Blocks */}
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-3 p-4 lg:px-[18px] lg:pb-3">
                {statistics
                  .filter((stat) => stat.chainName === "MVC")
                  .sort((a, b) => a.blockHeight - b.blockHeight)
                  .reduce((acc, block, index, array) => {
                    if (index < 4) {
                      acc.push(block);
                    } else if (index === array.length - 1 && array.length > 4) {
                      acc.push({ type: "ellipsis" } as const);
                      acc.push(block);
                    }
                    return acc;
                  }, [] as (BlockStatistics | { type: "ellipsis" })[])
                  .map((item) => {
                    if ("type" in item && item.type === "ellipsis") {
                      return (
                        <div
                          key="ellipsis"
                          className="text-white/50 self-center text-lg tracking-widest text-center"
                        >
                          ......
                        </div>
                      );
                    }

                    const block = item as BlockStatistics;
                    return (
                      <div
                        key={block.blockHash}
                        className="bg-[#8385F7] rounded-lg text-center p-3 flex flex-col items-center justify-center gap-2 aspect-square shrink-0"
                      >
                        <div className="text-black text-xs">
                          # {block.blockHeight}
                        </div>
                        <div className="text-[#3D3935] font-semibold text-sm">
                          {block.txCount} TX
                        </div>
                        <div className="text-black text-xs">
                          {formatTimeDisplay(block.blockTime)}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>


           {/* DOGE Section */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start lg:items-center mt-6">
            {/* DOGE Label */}
            <div className="relative h-[60px] lg:h-[80px] w-[120px] lg:w-[140px] bg-[#28211b] border border-[#DFC66D] rounded-lg p-3 lg:p-4 flex items-center before:hidden lg:before:block after:hidden lg:after:block before:content-[''] before:absolute before:left-full before:top-1/2 before:border-[11px] before:border-transparent before:border-l-[#DFC66D] before:-mt-[11px] after:content-[''] after:absolute after:left-full after:top-1/2 after:border-[9px] after:border-transparent after:border-l-[#28211b] after:-mt-[9px] after:pointer-events-none">
              <div className="flex items-center justify-center gap-2 lg:gap-2.5 w-full">
                <Image
                  src="/network/doge.png"
                  alt="DOGE"
                  width={20}
                  height={20}
                  className="w-5 h-5 lg:w-[22px] lg:h-[22px]"
                />
                <span className="text-white text-xl lg:text-[26px]">DOGE</span>
              </div>
            </div>

            {/* DOGE Content */}
            <div className="flex-1 w-full lg:w-auto bg-[#28211b] backdrop-blur-[40px] rounded-lg border border-white/10 min-h-[120px]">
              {/* DOGE Blocks */}
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-3 p-4 lg:px-[18px] lg:pb-3">
                {statistics
                  .filter((stat) => stat.chainName === "Doge")
                  .sort((a, b) => a.blockHeight - b.blockHeight)
                  .reduce((acc, block, index, array) => {
                    if (index < 4) {
                      acc.push(block);
                    } else if (index === array.length - 1 && array.length > 4) {
                      acc.push({ type: "ellipsis" } as const);
                      acc.push(block);
                    }
                    return acc;
                  }, [] as (BlockStatistics | { type: "ellipsis" })[])
                  .map((item) => {
                    if ("type" in item && item.type === "ellipsis") {
                      return (
                        <div
                          key="ellipsis"
                          className="text-white/50 self-center text-lg tracking-widest text-center"
                        >
                          ......
                        </div>
                      );
                    }

                    const block = item as BlockStatistics;
                    return (
                      <div
                        key={block.blockHash}
                        className="bg-[#DFC66D] rounded-lg text-center p-3 flex flex-col items-center justify-center gap-2 aspect-square shrink-0"
                      >
                        <div className="text-black text-xs">
                          # {block.blockHeight}
                        </div>
                        <div className="text-[#3D3935] font-semibold text-sm">
                          {block.txCount} TX
                        </div>
                        <div className="text-black text-xs">
                          {formatTimeDisplay(block.blockTime)}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:flex-shrink-0 bg-[#28211b] backdrop-blur-[40px] rounded-lg border border-white/10 py-6 lg:py-[50px] px-4 lg:px-[30px] md:min-w-[450px]">
          <div className="text-xl lg:text-2xl font-medium text-white mb-4 text-center">
            {t("metablockDetails")}
          </div>

          {/* Tabs and Network Toggle Container */}
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0 lg:justify-between mb-5">
            {/* Tabs */}
            <div className="flex space-x-4 bg-[#28211b] backdrop-blur-lg rounded-[40px] border border-[#47413D] px-4 py-2 overflow-x-auto scrollbar-none">
              {[
                { key: "all" },
                // { key: "consolidation" },
                // { key: "coinjoin" },
                // { key: "data" },
              ].map((tab, index) => (
                <button
                  key={tab.key}
                  className={`text-xs font-medium rounded-full transition-colors ${
                    index === 0
                      ? "text-white"
                      : "text-[#928D8A] hover:text-white"
                  }`}
                >
                  {t(`tabs.${tab.key}`)}
                </button>
              ))}
            </div>

            {/* Network Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-sm bg-[#FA9600]"></div>
                <span className="text-sm font-medium text-white">BTC</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-sm bg-[#8385F7]"></div>
                <span className="text-sm font-medium text-white">MVC</span>
              </div>
                <div className="flex items-center gap-2">
                <div className="size-3 rounded-sm bg-[#DFC66D]"></div>
                <span className="text-sm font-medium text-white">DOGE</span>
              </div>
            </div>
          </div>

          {/* Visualization Area */}
          <div className="grid grid-cols-[repeat(80,1fr)] grid-rows-[repeat(80,1fr)] w-full aspect-square shadow-inner bg-black/30 rounded-lg overflow-hidden">
            {(() => {
              const gridSize = 80;
              const cells: {
                row: number;
                col: number;
                size: number;
                color: string;
              }[] = [];

              if (!statistics.length) return [];

              const totalSize = statistics.reduce(
                (sum, stat) => sum + stat.blockSize,
                0
              );

              const getBlockCells = (blockSize: number) => {
                const cellCount = Math.max(
                  1,
                  Math.floor((blockSize / totalSize) * (gridSize * gridSize))
                );
                const size = Math.min(
                  16,
                  Math.max(1, Math.floor(Math.sqrt(cellCount)))
                );
                return { cellCount, size };
              };

              const grid = Array(gridSize)
                .fill(null)
                .map(() => Array(gridSize).fill(false));

              const isAreaAvailable = (
                row: number,
                col: number,
                size: number
              ) => {
                if (row + size > gridSize || col + size > gridSize)
                  return false;
                for (let i = 0; i < size; i++) {
                  for (let j = 0; j < size; j++) {
                    if (grid[row + i][col + j]) return false;
                  }
                }
                return true;
              };

              const markArea = (row: number, col: number, size: number) => {
                for (let i = 0; i < size; i++) {
                  for (let j = 0; j < size; j++) {
                    grid[row + i][col + j] = true;
                  }
                }
              };

              const tryPlaceBlock = (
                size: number,
                chainName: string
              ): boolean => {
                const attempts = 1000;
                for (let attempt = 0; attempt < attempts; attempt++) {
                  const row = Math.floor(Math.random() * (gridSize - size + 1));
                  const col = Math.floor(Math.random() * (gridSize - size + 1));

                  if (isAreaAvailable(row, col, size)) {
                    markArea(row, col, size);
                    cells.push({
                      row,
                      col,
                      size,
                      color:
                        chainName === "Bitcoin"
                          ? "bg-[#FA9600]" : chainName == 'Doge' ? 'bg-[#DFC66D]'
                          : "bg-[#8385F7]",
                    });
                    return true;
                  }
                }
                return false;
              };

              statistics.forEach((stat) => {
                const { size } = getBlockCells(stat.blockSize);
                let currentSize = size;
                while (
                  currentSize > 0 &&
                  !tryPlaceBlock(currentSize, stat.chainName)
                ) {
                  currentSize--;
                }
              });

              return cells.map((cell, i) => (
                <div
                  key={i}
                  style={{
                    gridColumn: `${cell.col + 1} / span ${cell.size}`,
                    gridRow: `${cell.row + 1} / span ${cell.size}`,
                    animationDelay: `${i * 2}ms`,
                  }}
                  className={`${cell.color} border border-black animate-in fade-in duration-300 fill-mode-both`}
                />
              ));
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

interface BlockVisualizationSectionProps {
  loading: boolean;
  selectedBlock: string;
  blocks: BlockData[];
  mempoolStats: TxStatistics[];
  blockInfo: BlockData | null;
  handleMempoolClick: () => void;
  handleBlockClick: (block: BlockData) => void;
  formatTimeDisplay: (timestamp: number) => string;
  t: (key: string) => string;
}

const BlockVisualizationSection: React.FC<BlockVisualizationSectionProps> = ({
  loading,
  selectedBlock,
  blocks,
  mempoolStats,
  blockInfo,
  handleMempoolClick,
  handleBlockClick,
  formatTimeDisplay,
  t,
}) => {
  if (loading) {
    return <BlockVisualizationSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
      {/* Mempool Card */}
      <div className="relative">
        <div className="text-white text-center mb-2">{t("mempool")}</div>
        <div
          className={`bg-[#FA9600] rounded-lg p-4 cursor-pointer relative transition-all duration-3000 animate-pulse-slow ${
            selectedBlock === "mempool" ? "ring-2 ring-white/30" : ""
          }`}
          onClick={handleMempoolClick}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-[#090909] mb-4">
              {t("tx")}:{" "}
              {(blockInfo?.blockTxCount?.Bitcoin?.totalTxCount ?? 0) +
                (blockInfo?.blockTxCount?.MVC?.totalTxCount ?? 0) + (blockInfo?.blockTxCount?.Doge?.totalTxCount ?? 0) }
            </div>
            <div className="text-sm text-[#090909] space-y-1">
              <div>
                BTC:{" "}
                {blockInfo
                  ? `${blockInfo.blockTxCount.Bitcoin?.totalTxCount || 0} TX`
                  : `${
                      mempoolStats.find((stat) => stat.chainName === "Bitcoin")
                        ?.txList?.length || 0
                    } TX`}
              </div>
              <div>
                MVC:{" "}
                {blockInfo
                  ? `${blockInfo.blockTxCount.MVC?.totalTxCount || 0} TX`
                  : `${
                      mempoolStats.find((stat) => stat.chainName === "MVC")
                        ?.txList?.length || 0
                    } TX`}
              </div>
               <div>
                DOGE:{" "}
                {blockInfo
                  ? `${blockInfo.blockTxCount.Doge?.totalTxCount || 0} TX`
                  : `${
                      mempoolStats.find((stat) => stat.chainName === "Doge")
                        ?.txList?.length || 0
                    } TX`}
              </div>
            </div>
          </div>
          <div className="text-xs text-[#090909]/80 mt-4 text-center">
            {t("timeWithin")}
          </div>
        </div>
        {/* Vertical Divider Line */}
        <div className="hidden md:block absolute right-[-16px] top-0 bottom-0 border-r border-dashed border-white/30" />
      </div>

      {/* Block Cards */}
      {blocks?.map((block) => {
        const timeDisplay = formatTimeDisplay(block.timestamp);

        return (
          <div key={block.header}>
            <div className="text-white text-center mb-2">
              # {block.metablockHeight}
            </div>
            <div
              className={`rounded-lg p-4 cursor-pointer relative transition-all duration-200 ${
                selectedBlock === block.header ? "ring-2 ring-white/30" : ""
              }`}
              style={{ backgroundColor: "#FFC060" }}
              onClick={() => handleBlockClick(block)}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-[#090909] mb-4">
                  {t("tx")}:{" "}
                  {new Decimal(block.blockTxCount.Bitcoin?.totalTxCount || 0)
                    .plus(block.blockTxCount.MVC?.totalTxCount || 0)
                    .toNumber()}
                </div>
                <div className="text-sm text-[#090909] space-y-1">
                  <div>
                    BTC:{" "}
                    {block.blockTxCount.Bitcoin ? (
                      <>{block.blockTxCount.Bitcoin?.totalTxCount} TX</>
                    ) : (
                      "--"
                    )}
                  </div>
                  <div>
                    MVC:{" "}
                    {block.blockTxCount.MVC ? (
                      <>{block.blockTxCount.MVC?.totalTxCount} TX</>
                    ) : (
                      "--"
                    )}
                  </div>
                    <div>
                    DOGE:{" "}
                    {block.blockTxCount.Doge ? (
                      <>{block.blockTxCount.Doge?.totalTxCount} TX</>
                    ) : (
                      "--"
                    )}
                  </div>

                </div>
              </div>
              <div className="text-xs text-[#090909]/80 mt-4 text-center">
                {timeDisplay}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const BlockchainVisualization = () => {
  const t = useTranslations("blockchain");
  const [selectedBlock, setSelectedBlock] = useState("103508");
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [blocksLoading, setBlocksLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statistics, setStatistics] = useState<BlockStatistics[]>([]);
  const [btcStep, setBtcStep] = useState<number>(0);
  // const [mempoolStats, setMempoolStats] = useState<TxStatistics[]>([]);
  const [currentHeight, setCurrentHeight] = useState<number>(-1);
  const [statisticsLoading, setStatisticsLoading] = useState(false);
  const [blockInfo, setBlockInfo] = useState<BlockData | null>(null);

  const currentBlocks = useMemo(() => {
    return statistics.filter((stat) => stat.chainName === "Bitcoin").length;
  }, [statistics]);

  const fetchLatestBlocks = async () => {
    try {
      setBlocksLoading(true);
      const latestResponse = await fetchLatestBlock();
      if (latestResponse.code === 0) {
        const lastNumber = latestResponse.data.lastNumber;
        const from = Math.max(0, lastNumber - 3);
        const to = lastNumber;

        const blocksResponse = await fetchBlockList(from, to);
        if (blocksResponse.code === 0) {
          const blocks = blocksResponse.data;
          
          setBlocks(blocks);
        } else {
          setError(blocksResponse.message);
        }
      } else {
        setError(latestResponse.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load blocks");
    } finally {
      setBlocksLoading(false);
    }
  };

  const fetchMempoolData = async () => {
    try {
      // const [txStatsResponse, blockInfoResponse] = await Promise.all([
      //   fetchTxStatistics(-1),
      //   fetchBlockInfo(-1),
      // ]);
      const blockInfoResponse = await fetchBlockInfo(-1);

      // console.log("txStatsResponse", txStatsResponse);
      console.log("blockInfoResponse", blockInfoResponse);

      // if (txStatsResponse.code === 0) {
      //   setMempoolStats(txStatsResponse.data);
      // }

      if (blockInfoResponse.code === 0) {
        
        setBlockInfo(blockInfoResponse.data);
      }
    } catch (err) {
      console.error("Failed to fetch mempool data:", err);
    }
  };

  useEffect(() => {
    // Initial load
    const loadInitialData = async () => {
      try {
        setLoading(true);
        handleMempoolClick();
        await Promise.all([fetchMempoolData(), fetchLatestBlocks()]);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();

    // Set up 10-minute refresh intervals
    const refreshIntervalId = setInterval(async () => {
      await Promise.all([fetchLatestBlocks(), fetchMempoolData()]);
    }, 10 * 60 * 1000);

    return () => {
      clearInterval(refreshIntervalId);
    };
  }, []);

  useEffect(() => {
    if (currentHeight === -1) {
      const intervalId = setInterval(() => {
        fetchStatisticsData(currentHeight);
      }, 10 * 60 * 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [currentHeight]);

  const formatTimeDisplay = (timestamp: number) => {
    const timeDiff = Math.floor((Date.now() / 1000 - timestamp) / 60);
    if (timeDiff < 60) {
      return `${timeDiff}${t("minutesAgo")}`;
    } else if (timeDiff < 24 * 60) {
      return `${Math.floor(timeDiff / 60)}${t("hoursAgo")}`;
    } else {
      return `${Math.floor(timeDiff / (24 * 60))}${t("daysAgo")}`;
    }
  };

  const fetchStatisticsData = async (height: number) => {
    try {
      setStatisticsLoading(true);
      const response = await fetchBlockStatistics(height);
      if (response.code === 0) {
        
        setStatistics(response.data.list);
        setBtcStep(response.data.btcStep);
      }
    } catch (err) {
      console.error("Failed to fetch statistics:", err);
    } finally {
      setStatisticsLoading(false);
    }
  };

  const handleBlockClick = (block: BlockData) => {
    setSelectedBlock(block.header);
    setCurrentHeight(block.metablockHeight);
    fetchStatisticsData(block.metablockHeight);
  };

  const handleMempoolClick = () => {
    setSelectedBlock("mempool");
    setCurrentHeight(-1);
    fetchStatisticsData(-1);
  };

  if (loading) {
    return (
      <section className="bg-black min-h-screen pt-16 md:pt-24 pb-8">
        <div className="container mx-auto px-4">
          <LoadingSkeleton />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg">
          错误: {error}
        </div>
      </div>
    );
  }

  return (
    <section className="bg-black min-h-screen pt-16 md:pt-24 pb-8">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-4xl font-bold mb-8 text-white">
          {t("title")}
        </h1>

        <BlockVisualizationSection
          loading={blocksLoading}
          selectedBlock={selectedBlock}
          blocks={blocks}
          mempoolStats={[]}
          blockInfo={blockInfo}
          handleMempoolClick={handleMempoolClick}
          handleBlockClick={handleBlockClick}
          formatTimeDisplay={formatTimeDisplay}
          t={t}
        />

        <ProgressBarSection
          loading={statisticsLoading}
          selectedBlock={selectedBlock}
          blocks={blocks}
          statistics={statistics}
          btcStep={btcStep}
          currentBlocks={currentBlocks}
          formatTimeDisplay={formatTimeDisplay}
          t={t}
        />
      </div>
    </section>
  );
};
