import { NextRequest, NextResponse } from "next/server";

const gettrailer = (data: any) => {
  //movietypedata
  const trailers = data.filter((items: { type: string }) => {
    return items.type === "Trailer";
  });
  return trailers[0];
};

const fetchmoviespopular = async (type: string, id: number) => {
  if (id === 0) {
    return null;
  }
  const url = `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`;
  console.log(type, id);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_READ}`,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();
  const yid = await gettrailer(data.results);
  if (response.status !== 200) {
    return null;
  } else {
    return yid.key;
  }
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    console.log("1erererer");
    const body = await req.json(); // Parse the request body
    const { type, id } = body;
    console.log("2erererer");
    const data = await fetchmoviespopular(type, id);
    console.log("3erererer");

    return NextResponse.json(
      {
        payload: data,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: err,
      },
      { status: 406 }
    );
  }
}
