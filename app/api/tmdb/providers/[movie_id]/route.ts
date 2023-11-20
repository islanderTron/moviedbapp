export function GET({params}) {
  console.log(params);
  
  return Response.json({
    status: 200,
  });
}