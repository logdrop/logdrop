import { FC } from "react";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
} from "@tremor/react";

interface Props {
  data: {
    endpoint: string;
    method: string;
    status: number;
    timeTaken: string;
    createdAt: string;
  }[];
}

const head = ["Endpoint", "Method", "Status", "Time Taken", "Created"];

const RequestsTable: FC<Props> = ({ data }) => {
  return (
    <Card className="!bg-transparent">
      <Table className="">
        <TableHead>
          <TableRow>
            {head.map((item, i) => (
              <TableHeaderCell className="font-semibold" key={i}>
                {item}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.endpoint}</TableCell>
              <TableCell>
                <Text className="font-semibold">{item.method}</Text>
              </TableCell>
              <TableCell>
                <Badge
                  color={
                    item.status === 200 || item.status === 201 ? "green" : "red"
                  }
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Text>{item.timeTaken}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.createdAt}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default RequestsTable;
