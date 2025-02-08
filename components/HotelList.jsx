import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import React from 'react'
  
  function HotelList() {
    return (
        <Table className="mb-5">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Due Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Novotel</TableCell>
            <TableCell>Access</TableCell>
            <TableCell>novotel@gmail.com</TableCell>
            <TableCell>5.5.2024</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
    )
  }
  
  export default HotelList