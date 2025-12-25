// Interface definitions
export interface Chain {
  chain: string;
  preEndBlock: string;
  startBlock: string;
  endBlock: string;
}

export interface BlockTxCount {
  totalTxCount: number;
  metaIdTxCount: number;
}

export interface BlockData {
  header: string;
  preHeader: string;
  metablockHeight: number;
  chains: Chain[] | null;
  onChain: string;
  timestamp: number;
  txHash: string;
  txIndex: number;
  step: number;
  blockTxCount: {
    Bitcoin: BlockTxCount;
    MVC: BlockTxCount;
    Doge:BlockTxCount
  };
}

export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

// Latest block data response type
export interface LatestBlockResponse {
  blockData: BlockData;
  init: number;
  lastNumber: number;
  step: number;
}

// Block statistics type
export interface BlockStatistics {
  metablockHeight: number;
  metablockHeader: string;
  meatIdTxCount: number;
  metaIdTxFee: number;
  metaIdTxSize: number;
  chainName: string;
  blockHeight: number;
  blockHash: string;
  blockTime: number;
  txCount: number;
  blockSize: number;
  blockFee: number;
}

// Block statistics response type
export interface BlockStatisticsResponse {
  list: BlockStatistics[];
  btcStep: number;
}

interface TxInfo {
  txHash: string;
  txSize: number;
  txFee: number;
}

export interface TxStatistics {
  chainName: string;
  blockHeight: number;
  txList: TxInfo[] | null;
}

// Get API base URL
const getApiBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  return baseUrl;
};

// Generic fetch wrapper
const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<T> = await response.json();
    return data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// Fetch block list
export const fetchBlockList = async (
  from: number,
  to: number
): Promise<ApiResponse<BlockData[]>> => {
  return fetchApi<BlockData[]>(`/api/block/list?from=${from}&to=${to}`);
};

// Fetch latest block
export const fetchLatestBlock = async (): Promise<
  ApiResponse<LatestBlockResponse>
> => {
  return fetchApi<LatestBlockResponse>("/api/block/latest");
};

// Fetch block statistics
export const fetchBlockStatistics = async (
  height: number
): Promise<ApiResponse<BlockStatisticsResponse>> => {
  return fetchApi<BlockStatisticsResponse>(
    `/api/statistics/metablock?height=${height}`
  );
};

// Fetch block info
export const fetchBlockInfo = async (
  number: number
): Promise<ApiResponse<BlockData>> => {
  return fetchApi<BlockData>(`/api/block/info?number=${number}`);
};

// Fetch transaction statistics
export const fetchTxStatistics = async (
  height: number
): Promise<ApiResponse<TxStatistics[]>> => {
  return fetchApi<TxStatistics[]>(`/api/statistics/tx?height=${height}`);
};

// 使用示例:
// const response = await fetchBlockList(0, 10);
// const blocks = response.data;
