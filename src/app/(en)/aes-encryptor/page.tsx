import ToolPageShell from "@/components/ToolPageShell";
import AesEncryptorTool from "@/components/tools/AesEncryptorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "aes-encryptor";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><AesEncryptorTool /></ToolPageShell>; }
