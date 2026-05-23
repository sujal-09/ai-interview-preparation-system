function AnalyticsCards({
    totalInterviews,
    averageScore,
    totalQuestionsAnswered
}) {

    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

            <div className="bg-slate-900 p-6 rounded-2xl">

                <h2 className="text-xl text-slate-400">
                    Total Interviews
                </h2>

                <p className="text-4xl font-bold mt-4">
                    {totalInterviews}
                </p>

            </div>

            <div className="bg-slate-900 p-6 rounded-2xl">

                <h2 className="text-xl text-slate-400">
                    Average Score
                </h2>

                <p className="text-4xl font-bold mt-4 text-green-400">
                    {averageScore.toFixed(1)}
                </p>

            </div>

            <div className="bg-slate-900 p-6 rounded-2xl">

                <h2 className="text-xl text-slate-400">
                    Questions Answered
                </h2>

                <p className="text-4xl font-bold mt-4 text-cyan-400">
                    {totalQuestionsAnswered}
                </p>

            </div>

        </div>
    );
}

export default AnalyticsCards;