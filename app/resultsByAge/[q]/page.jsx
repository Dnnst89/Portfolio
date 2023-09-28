import AgeResultsComponent from "@/components/AgeResultsComponent"

function page({ params }) {
    const { q } = params

    return (
        <AgeResultsComponent ageRange={q} />
    )
}

export default page