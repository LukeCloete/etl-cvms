import { Msisdns } from "@/lib/definitions";
import { getCurrentAgent } from "@/lib/getAgent";
import { redirect } from "next/navigation";

export default async function Home() {
  const agent = await getCurrentAgent();

  if (!agent) {
    redirect("/log-in");
  }

  return (
    <main className="container mx-auto max-w-[800px]">
      <div className="flex flex-col">
        <strong>Agents</strong>
        <p>Your team&apos;s weekly performance.</p>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Agent
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Ebucks
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Points
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Msisdns
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr key={agent.$id}>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                {agent.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {agent.current_ebucks}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {agent.current_points}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {agent.msisdns?.map((msisdn: Msisdns, index: number) => (
                  <p key={index}>{msisdn.msisdn}</p>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
