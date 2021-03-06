import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from '../List'
import Tree from '../Tree'
import Spin from '../Spin'
import { getLocale } from '../locale'
import { selectClass } from '../styles'

const ScaleList = List(['fade', 'scale-y'], 'fast')

class OptionList extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  getText(key) {
    return this.props.text[key] || getLocale(key)
  }

  handleClick(data) {
    const { datum, onChange } = this.props
    if (datum.disabled(data)) return
    onChange(null, data)
  }

  renderItem(data) {
    const { renderItem, datum } = this.props
    return (
      <span className={selectClass('tree-node', datum.check(data) && 'selected', datum.disabled(data) && 'disabled')}>
        {renderItem(data)}
      </span>
    )
  }

  renderTree() {
    const { loading, treeData, keygen, onExpand, loader, expanded, defaultExpanded, renderPending } = this.props
    if (loading)
      return (
        <span className={selectClass('option')}>{typeof loading === 'boolean' ? <Spin size={20} /> : loading}</span>
      )
    if (treeData.length === 0 || renderPending)
      return <span className={selectClass('option')}>{this.getText('noData')}</span>

    return (
      <div className={selectClass('tree-wrapper')}>
        <Tree
          onClick={this.handleClick}
          line={false}
          data={treeData}
          keygen={keygen}
          renderItem={this.renderItem.bind(this)}
          onExpand={onExpand}
          loader={loader}
          expanded={expanded}
          defaultExpanded={defaultExpanded}
        />
      </div>
    )
  }

  render() {
    const { focus, style, selectId, height } = this.props
    const mergeStyle = Object.assign({}, { maxHeight: height, overflowY: 'auto' }, style)
    return (
      <ScaleList show={focus} style={mergeStyle} data-id={selectId} className={selectClass('options', 'tree')}>
        {this.renderTree()}
      </ScaleList>
    )
  }
}

OptionList.propTypes = {
  onChange: PropTypes.func,
  loader: PropTypes.func,
  defaultExpanded: PropTypes.arrayOf(PropTypes.string),
  expanded: PropTypes.arrayOf(PropTypes.string),
  renderPending: PropTypes.bool,
  treeData: PropTypes.array,
  datum: PropTypes.object.isRequired,
  focus: PropTypes.bool,
  onExpand: PropTypes.func,
  keygen: PropTypes.any,
  loading: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  selectId: PropTypes.string,
  style: PropTypes.object,
  text: PropTypes.object,
  height: PropTypes.number,
}

export default OptionList
