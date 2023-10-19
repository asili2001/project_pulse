import { useContext, useState } from "react";
import IReport from "../../types/IReport";
import IUser from "../../types/IUser";
import { unixTimestampToStrDate } from "../forms/NewProject";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { UserContext } from "../../context/user.context";

import '@mdxeditor/editor/style.css'
import { MDXEditor } from '@mdxeditor/editor/MDXEditor'
import { Separator } from '@radix-ui/react-toolbar';
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo'
import { BlockTypeSelect } from '@mdxeditor/editor/plugins/toolbar/components/BlockTypeSelect'
import { ListsToggle } from '@mdxeditor/editor/plugins/toolbar/components/ListsToggle'
import { InsertThematicBreak } from '@mdxeditor/editor/plugins/toolbar/components/InsertThematicBreak'
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles'
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar';
import { linkDialogPlugin } from '@mdxeditor/editor/plugins/link-dialog';
import { CreateLink } from '@mdxeditor/editor/plugins/toolbar/components/CreateLink';
import { linkPlugin } from '@mdxeditor/editor/plugins/link';
import { thematicBreakPlugin } from '@mdxeditor/editor/plugins/thematic-break'
import { listsPlugin } from '@mdxeditor/editor/plugins/lists'
import { headingsPlugin } from '@mdxeditor/editor/plugins/headings'
import { ReportContext } from "../../context/reports.context";
import { IProject } from "../../types/IProject";

const ReportViewer = (props: { report: IReport, member: IUser, project: IProject }) => {
    const { userData } = useContext(UserContext);
    const { submitReport } = useContext(ReportContext);
    const [markdown, setMarkdown] = useState<string>("");

    const handleEditorChange = (text: string) => {
        setMarkdown(text);
    };
    const handleReportSubmit = async () => {
        if (!props.report.id) return;
        const result = await submitReport(props.project.id, props.report.id, markdown);
        if (!result) {
            return;
        } else {
            window.location.reload();
            return;
        }

    }
    return (
        props.report.submission_date ? <>
            <ul className="grid grid-cols-2">
                <li>
                    <p className="font-bold">Reporting Period</p>
                    <p>{unixTimestampToStrDate(props.report.submission_start, true)} - {unixTimestampToStrDate(props.report.submission_end, true)}</p>
                </li>
                <li className="text-right">
                    <p className="font-bold">Submitted</p>
                    <p>{unixTimestampToStrDate(props.report.submission_date, true)}</p>
                </li>
                <li>
                    <p className="font-bold">Report Title</p>
                    <p>{props.report.name}</p>
                </li>
                <li className="text-right">
                    <p className="font-bold">Submitted by</p>
                    <p>{props.member.name}</p>
                </li>
            </ul>
            <br />
            <div className="border-t-4 m-4 p-4 overflow-scroll max-h-[40rem]" data-color-mode="light">
                <MarkdownPreview source={props.report.content} />
            </div>
        </> : (
            userData.role === 0 && userData.id === props.member.id ? (
                <>
                    <MDXEditor markdown={""} onChange={handleEditorChange} contentEditableClassName="prose"
                        plugins={[toolbarPlugin({
                            toolbarContents: () => (<>
                                <UndoRedo />
                                <BlockTypeSelect />
                                <BoldItalicUnderlineToggles />
                                <ListsToggle />
                                <CreateLink />
                                <InsertThematicBreak />
                                <Separator />
                            </>)
                        }), linkPlugin(), linkDialogPlugin(), thematicBreakPlugin(), listsPlugin(), headingsPlugin()]}
                    />
                    <button className="submit button bg-black rounded p-4" onClick={handleReportSubmit}>Send Report</button>
                </>
            ) : (
                <h2 className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">Not submitted yet</h2>
            )
        )
    );
}

export default ReportViewer;