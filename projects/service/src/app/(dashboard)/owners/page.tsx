import { OwnersList } from "@/features/owners/OwnersList/OwnersList";
import * as ownerService from "@/services/owner.service";

export default async function OwnersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const owners = await ownerService.listOwners(params.q);
  return <OwnersList owners={owners} />;
}
