"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { getPlanFromDb } from "../../../utils/dbqueries/maybeLikeThis";

export default function Page() {
  const router = useRouter();
  const [dbEntry, setDbEntry] = useState<String | undefined>(undefined);

  async function getPlanIdFromUrl(url: string) {
    const regex = /\/plan\/(.+)/;
    const match = url.match(regex);
    if (match) {
      const foo = await getPlanFromDb(match[1]);
      if (!foo.plan) {
        handleNoResult();
      }
      return foo;
    }
  }

  function handleNoResult() {
    router.push("/plan");
  }

  const getDBResponse = async () => {
    const whatisthis = await getPlanIdFromUrl(usePathname());
    const foo = JSON.stringify(whatisthis);
    setDbEntry(foo);
  };

  const renderRespone = () => {
    if (!dbEntry) return;

    return <div>{dbEntry}</div>;
  };

  getDBResponse();

  return (
    <div>
      <h1>DBEntry: Hello</h1>
      {renderRespone()}
    </div>
  );
}
