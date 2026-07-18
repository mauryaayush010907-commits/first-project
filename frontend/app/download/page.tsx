import AnalyzeClient from "@/components/AnalyzeClient";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ url?: string }>;
};

export default async function DownloadPage({ searchParams }: Props) {
  const params = await searchParams;
  const url = params.url ?? "";
  return <AnalyzeClient url={url} />;
}
