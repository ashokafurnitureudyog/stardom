import "./loading.css";
import BaseLayout from "@/components/layout/BaseLayout";

const Loading = () => {
  return (
    <BaseLayout className="flex items-center justify-between flex-col">
      {/* From Uiverse.io by elijahgummer */}
      <div className="mainWrap">
        <div className="wrapper">
          <div className="c1">
            <div className="c2">
              <div className="c3">
                <div className="rect1">
                  <div className="miniC" />
                  <div className="c4">
                    <div className="rect2">
                      <div className="rect3" />
                    </div>
                  </div>
                  <div className="c5" />
                  <div className="c6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Loading;
