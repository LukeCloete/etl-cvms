// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { PhoneCall, Activity } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableHead,
//   TableRow,
// } from "@/components/ui/table";
// import DashboardCard from "@/components/DashboardCard";
// import { CardSim, TrendingUp } from "lucide-react";
// export default function page() {
//   return (
//     <div>
//       <div className="flex p-8 ">
//         <div className="w-2/3 mr-4 ml-4 ">
//           <div className="text-econetBlue mb-4 ">
//             <p>Dashboard &gt; Agents</p>
//           </div>
//           <p className=" text-econetBlue text-3xl font-bold">Admin Dashboard</p>
//           <p className="mt-4 mb-8">View and manage agent accounts</p>

//           {/* First row of CARDS */}
//           <div className="flex justify-center gap-4 mb-8 ">
//             <DashboardCard
//               title={"Total Agents"}
//               date={"date"}
//               value={"100 MB"}
//             ></DashboardCard>

//             <DashboardCard
//               title={"Total Daily SMS of All Agents"}
//               date={"date"}
//               value={"10 SMS"}
//             ></DashboardCard>

//             <DashboardCard
//               title={"Total Daily Voice of All Agents"}
//               date={"date"}
//               value={"20 Mins"}
//             ></DashboardCard>

//             <DashboardCard
//               title={"Weekly Cash-In of All Agents"}
//               date={"date"}
//               value={"200 LSL"}
//             ></DashboardCard>

//             <DashboardCard
//               title={"Weekly Cash-Out of All Agents"}
//               date={"date"}
//               value={"100 LSL"}
//             ></DashboardCard>
//           </div>

//           {/* Agent List Card */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex">Agent List</CardTitle>
//               <CardDescription className="">
//                 Manage agent accounts and view their activity
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="flex flex-col gap-4">
//               <Table className="border-2 border-solid border-gray-200 rounded-xl ">
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="mt-8">Agent Name</TableHead>
//                     <TableHead>Contact</TableHead>
//                     <TableHead>E-Bucks Balance</TableHead>
//                     <TableHead>Tier</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Action</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell className="font-medium">
//                       Agent Number 1
//                     </TableCell>
//                     <TableCell>+266 456 7896</TableCell>
//                     <TableCell>5 000</TableCell>
//                     <TableCell>Gold</TableCell>
//                     <TableCell>Active</TableCell>
//                     <TableCell>...</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">
//                       Agent Number 2
//                     </TableCell>
//                     <TableCell>+266 456 1234</TableCell>
//                     <TableCell>4 000</TableCell>
//                     <TableCell>Silver</TableCell>
//                     <TableCell>Active</TableCell>
//                     <TableCell>...</TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="w-1/3 flex flex-col gap-4">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex space-x-2 ">
//                 <div>
//                   <Activity />
//                 </div>
//                 <div>Recent Agent Activity</div>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="flex flex-col gap-2">
//               <Table>
//                 <TableHeader></TableHeader>
//                 <TableBody>
//                   <TableRow className="flex justify-between border-2  border-solid p-2 mb-2 rounded-lg ">
//                     <TableCell className="font-medium ">
//                       <div className="flex space-x-4 ">
//                         <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
//                           <CardSim className="text-white size-6" />
//                         </div>
//                         <div>
//                           <p className="font-bold">80 MB DAILY BUNDLE</p>
//                           <p className="ml-auto">
//                             Agent 1 Redeemed at 08:32 24/08/25
//                           </p>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <p className="rounded-full border-2 border-red-500 bg-red-100 px-6 py-3 text-red-700">
//                         -200 E-Bucks
//                       </p>
//                     </TableCell>
//                   </TableRow>

//                   <TableRow className="flex justify-between border-2  border-solid p-2 mb-2 rounded-lg ">
//                     <TableCell className="font-medium ">
//                       <div className="flex space-x-4 ">
//                         <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
//                           <PhoneCall className="text-white size-6" />
//                         </div>
//                         <div>
//                           <p className="font-bold">Voice Call - 8 Minutes</p>
//                           <p className="ml-auto">
//                             Agent 1 Redeemed at 16:44 22/08/25
//                           </p>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <p className="rounded-full border-2 border-green-500 bg-green-100 px-6 py-3 text-green-700">
//                         +25 E-Bucks
//                       </p>
//                     </TableCell>
//                   </TableRow>

//                   <TableRow className="flex justify-between border-2  border-solid p-2 mb-2 rounded-lg ">
//                     <TableCell className="font-medium ">
//                       <div className="flex space-x-4 ">
//                         <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
//                           <PhoneCall className="text-white size-6" />
//                         </div>
//                         <div>
//                           <p className="font-bold">Voice Call - 12 Minutes</p>
//                           <p className="ml-auto">
//                             Agent 1 Redeemed at 17:03 18/08/25
//                           </p>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <p className="rounded-full border-2 border-green-500 bg-green-100 px-6 py-3 text-green-700">
//                         +25 E-Bucks
//                       </p>
//                     </TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle className="flex space-x-2 ">
//                 <div>
//                   <TrendingUp />
//                 </div>
//                 <div>Most Popular Items</div>
//               </CardTitle>
//               <CardDescription>Top redeemed items this week</CardDescription>
//             </CardHeader>
//             <CardContent className="flex flex-col gap-2">
//               <Table>
//                 <TableHeader></TableHeader>
//                 <TableBody>
//                   <TableRow className="flex justify-between border-2  border-solid p-2 mb-2 rounded-lg ">
//                     <TableCell className="font-medium ">
//                       <div className="flex space-x-4 ">
//                         <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
//                           <CardSim className="text-white size-6" />
//                         </div>
//                         <div>
//                           <p className="font-bold">80 MB DAILY BUNDLE</p>
//                           <p className="ml-auto">800 E-Bucks</p>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="mb-4">
//                         <p className="font-bold">19</p>
//                         <p>Redemptions</p>
//                       </div>
//                     </TableCell>
//                   </TableRow>

//                   <TableRow className="flex justify-between border-2  border-solid p-2 mb-2 rounded-lg ">
//                     <TableCell className="font-medium ">
//                       <div className="flex space-x-4 ">
//                         <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
//                           <PhoneCall className="text-white size-6" />
//                         </div>
//                         <div>
//                           <p className="font-bold">2GB WEEKLY BUNDLE</p>
//                           <p className="ml-auto">800 E-Bucks</p>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="mb-4">
//                         <p className="font-bold">11</p>
//                         <p>Redemptions</p>
//                       </div>
//                     </TableCell>
//                   </TableRow>

//                   <TableRow className="flex justify-between border-2  border-solid p-2 mb-2 rounded-lg ">
//                     <TableCell className="font-medium ">
//                       <div className="flex space-x-4 ">
//                         <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
//                           <PhoneCall className="text-white size-6" />
//                         </div>
//                         <div>
//                           <p className="font-bold">
//                             1 Hour Airtime WEEKLY BUNDLE
//                           </p>
//                           <p className="ml-auto">800 E-Bucks</p>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="mb-4">
//                         <p className="font-bold">9</p>
//                         <p>Redemptions</p>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
