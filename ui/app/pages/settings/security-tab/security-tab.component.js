import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ToggleButton from '../../../components/ui/toggle-button'
import { REVEAL_SEED_ROUTE } from '../../../helpers/constants/routes'
import Button from '../../../components/ui/button'

export default class SecurityTab extends PureComponent {
  static contextTypes = {
    t: PropTypes.func,
    metricsEvent: PropTypes.func,
  }

  static propTypes = {
    displayWarning: PropTypes.func,
    revealSeedConfirmation: PropTypes.func,
    warning: PropTypes.string,
    history: PropTypes.object,
    mobileSync: PropTypes.bool,
    participateInMetaMetrics: PropTypes.bool,
    setParticipateInMetaMetrics: PropTypes.func,
  }

  renderSeedWords () {
    const { t } = this.context
    const { history } = this.props

    return (
      <div className="settings-page__content-row">
        <div className="settings-page__content-item">
          <span>{ t('revealSeedWords') }</span>
        </div>
        <div className="settings-page__content-item">
          <div className="settings-page__content-item-col">
            <Button
              type="danger"
              large
              onClick={event => {
                event.preventDefault()
                this.context.metricsEvent({
                  eventOpts: {
                    category: 'Settings',
                    action: 'Reveal Seed Phrase',
                    name: 'Reveal Seed Phrase',
                  },
                })
                history.push(REVEAL_SEED_ROUTE)
              }}
            >
              { t('revealSeedWords') }
            </Button>
          </div>
        </div>
      </div>
    )
  }

  renderMetaMetricsOptIn () {
    const { t } = this.context
    const { participateInMetaMetrics, setParticipateInMetaMetrics } = this.props

    return (
      <div className="settings-page__content-row">
        <div className="settings-page__content-item">
          <span>{ t('participateInMetaMetrics') }</span>
          <div className="settings-page__content-description">
            <span>{ t('participateInMetaMetricsDescription') }</span>
          </div>
        </div>
        <div className="settings-page__content-item">
          <div className="settings-page__content-item-col">
            <ToggleButton
              value={participateInMetaMetrics}
              onToggle={value => setParticipateInMetaMetrics(!value)}
              offLabel={t('off')}
              onLabel={t('on')}
            />
          </div>
        </div>
      </div>
    )
  }

  renderContent () {
    const { warning } = this.props

    return (
      <div className="settings-page__body">
        { warning && <div className="settings-tab__error">{ warning }</div> }
        { this.renderSeedWords() }
        { this.renderMetaMetricsOptIn() }
      </div>
    )
  }

  render () {
    return this.renderContent()
  }
}
