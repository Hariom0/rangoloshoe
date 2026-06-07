export const dynamic = 'force-dynamic';
import AdminGrid from "@/app/components/admin/AdminGrid";

type Props = {
    searchParams: {
        category?: string;
        page?: string;
        gender?: string;
    };
};

export default async function AdminPage({ searchParams }: Props) {
    const params = await searchParams;

    const category = params.category || "all";
    const gender = params.gender || "all";
    const page = params.page || "1";

    return (
        <AdminGrid 
            category={category}
            gender={gender}
            page={page}
        />
    );
}